import { Injectable, InternalServerErrorException } from '@nestjs/common';

interface StripeProduct {
  id: string;
  name: string;
  object: string;
  active: boolean;
  description?: string | null;
  metadata?: Record<string, string>;
}

interface StripePrice {
  id: string;
  product: string;
  currency: string;
  unit_amount: number;
  recurring: {
    interval: string;
    interval_count: number;
  } | null;
}

interface StripeLineItem {
  price: {
    id: string;
  };
}

interface StripePaymentLink {
  url: string;
  active: boolean;
  line_items?: {
    data: StripeLineItem[];
  };
}

interface StripeListResponse<T> {
  data: T[];
  has_more: boolean;
  object: string;
  url: string;
}

interface StripeEntitlementFeature {
  id: string;
  object: string;
  name: string;
  lookup_key: string;
  metadata?: Record<string, string>;
}

interface StripeProductFeature {
  id: string;
  object: string;
  livemode: boolean;
  entitlement_feature: StripeEntitlementFeature;
}

interface PriceWithLink extends StripePrice {
  payment_link: string | null;
}

interface PricingPlan {
  id: string;
  name: string;
  active: boolean;
  description: string | null;
  prices: {
    currency: string;
    amount: number;
  };
  payment_link: string | null;
  features: string[];
}

interface PricingPlansByInterval {
  month: PricingPlan[];
  year: PricingPlan[];
}

@Injectable()
export class StripeService {
  private stripeSecret = process.env.STRIPE_SECRET_KEY!;

  private async stripeFetch<T>(
    path: string,
    params?: URLSearchParams,
  ): Promise<T> {
    const url = `https://api.stripe.com/v1/${path}${params ? '?' + params.toString() : ''}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(this.stripeSecret + ':').toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new InternalServerErrorException(`Failed to fetch Stripe ${path}`);
    }

    const data = (await response.json()) as T;
    return data;
  }

  /**
   * Fetches features for a product using the Stripe Product Features API.
   * Uses GET /v1/products/:id/features endpoint.
   */
  private async fetchProductFeatures(productId: string): Promise<string[]> {
    try {
      const featuresData = await this.stripeFetch<
        StripeListResponse<StripeProductFeature>
      >(`products/${productId}/features`);

      // Extract feature names from the entitlement_feature objects
      return featuresData.data.map(
        (productFeature) => productFeature.entitlement_feature.name,
      );
    } catch {
      // If the API call fails (e.g., product has no features), return empty array
      // This is expected for products without features, so we don't log it as an error
      return [];
    }
  }

  async getPricingPlans(): Promise<PricingPlansByInterval> {
    // 1. Fetch products, prices, and payment links concurrently
    const [productsData, pricesData, paymentLinksData] = await Promise.all([
      this.stripeFetch<StripeListResponse<StripeProduct>>(
        'products',
        new URLSearchParams({ limit: '100' }),
      ),
      this.stripeFetch<StripeListResponse<StripePrice>>(
        'prices',
        new URLSearchParams({ limit: '100' }),
      ),
      this.stripeFetch<StripeListResponse<StripePaymentLink>>(
        'payment_links',
        new URLSearchParams({
          limit: '100',
          'expand[]': 'data.line_items.data.price',
        }),
      ),
    ]);

    // 2. Fetch features for all products in parallel
    const productFeaturesMap = new Map<string, string[]>();
    const uniqueProductIds = Array.from(
      new Set(productsData.data.map((product) => product.id)),
    );
    const featurePromises = uniqueProductIds.map(async (productId) => {
      const features = await this.fetchProductFeatures(productId);
      productFeaturesMap.set(productId, features);
    });
    await Promise.all(featurePromises);

    // 3. Build a map of price ID -> payment link URL (only for active payment links)
    const priceToPaymentLink = new Map<string, string>();
    for (const link of paymentLinksData.data) {
      // Only process active payment links
      if (!link.active) continue;

      if (link.line_items?.data) {
        for (const item of link.line_items.data) {
          if (item.price?.id) {
            // Use the first active payment link found for each price
            if (!priceToPaymentLink.has(item.price.id)) {
              priceToPaymentLink.set(item.price.id, link.url);
            }
          }
        }
      }
    }

    // 4. Map prices with their payment links
    const pricesWithLinks: PriceWithLink[] = pricesData.data.map(
      (price: StripePrice) => ({
        ...price,
        payment_link: priceToPaymentLink.get(price.id) || null,
      }),
    );

    // 5. Group prices by product and interval
    const pricesByProductAndInterval: Record<
      string,
      Record<string, PriceWithLink>
    > = {};
    for (const price of pricesWithLinks) {
      if (!price.recurring) continue; // Skip non-recurring prices
      const interval = price.recurring.interval;
      if (interval !== 'month' && interval !== 'year') continue;

      if (!pricesByProductAndInterval[price.product]) {
        pricesByProductAndInterval[price.product] = {};
      }
      // Use the first price found for each interval (or you could add logic to pick the best one)
      if (!pricesByProductAndInterval[price.product][interval]) {
        pricesByProductAndInterval[price.product][interval] = price;
      }
    }

    // 6. Build result grouped by interval
    const result: PricingPlansByInterval = {
      month: productsData.data
        .map((product) => {
          const productPrices = pricesByProductAndInterval[product.id] || {};
          const features = productFeaturesMap.get(product.id) || [];

          if (!productPrices.month) return null;

          return {
            id: product.id,
            name: product.name,
            active: product.active,
            description: product.description || null,
            prices: {
              currency: productPrices.month.currency,
              amount: productPrices.month.unit_amount,
            },
            payment_link: productPrices.month.payment_link,
            features,
          };
        })
        .filter((plan): plan is PricingPlan => plan !== null),
      year: productsData.data
        .map((product) => {
          const productPrices = pricesByProductAndInterval[product.id] || {};
          const features = productFeaturesMap.get(product.id) || [];

          if (!productPrices.year) return null;

          return {
            id: product.id,
            name: product.name,
            active: product.active,
            description: product.description || null,
            prices: {
              currency: productPrices.year.currency,
              amount: productPrices.year.unit_amount,
            },
            payment_link: productPrices.year.payment_link,
            features,
          };
        })
        .filter((plan): plan is PricingPlan => plan !== null),
    };

    // Sort the month and year arrays by amount in ascending order
    result.month.sort((a, b) => a.prices.amount - b.prices.amount);
    result.year.sort((a, b) => a.prices.amount - b.prices.amount);

    return result;
  }
}
