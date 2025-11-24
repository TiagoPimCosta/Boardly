import { Injectable, InternalServerErrorException } from '@nestjs/common';

interface StripeProduct {
  id: string;
  name: string;
  object: string;
  active: boolean;
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

interface PriceWithLink extends StripePrice {
  payment_link: string | null;
}

interface PricingPlan {
  id: string;
  name: string;
  active: boolean;
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
      console.error(await response.text());
      throw new InternalServerErrorException(`Failed to fetch Stripe ${path}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Extracts features from Stripe product metadata.
   * Supports multiple formats:
   * - JSON array string: metadata.features = '["Feature 1", "Feature 2"]'
   * - Comma-separated: metadata.features = "Feature 1,Feature 2"
   * - Individual keys: metadata.feature_1, metadata.feature_2, etc.
   */
  private extractFeatures(product: StripeProduct): string[] {
    if (!product.metadata) {
      return [];
    }

    const metadata = product.metadata;

    // Try JSON array format first
    if (metadata.features) {
      try {
        const parsed: unknown = JSON.parse(metadata.features);
        if (
          Array.isArray(parsed) &&
          parsed.every((item) => typeof item === 'string')
        ) {
          return parsed;
        }
      } catch {
        // If JSON parsing fails, try comma-separated format
        if (metadata.features.includes(',')) {
          return metadata.features.split(',').map((f) => f.trim());
        }
        // Single feature
        return [metadata.features];
      }
    }

    // Try comma-separated format
    if (metadata.features && metadata.features.includes(',')) {
      return metadata.features.split(',').map((f) => f.trim());
    }

    // Try individual feature keys (feature_1, feature_2, etc.)
    const featureKeys = Object.keys(metadata)
      .filter((key) => key.startsWith('feature_'))
      .sort()
      .map((key) => metadata[key])
      .filter((value) => value && value.trim() !== '');

    if (featureKeys.length > 0) {
      return featureKeys;
    }

    return [];
  }

  async getPricingPlansWithPricesAndLinks(): Promise<PricingPlansByInterval> {
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

    // 2. Build a map of price ID -> payment link URL (only for active payment links)
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

    // 3. Map prices with their payment links
    const pricesWithLinks: PriceWithLink[] = pricesData.data.map(
      (price: StripePrice) => ({
        ...price,
        payment_link: priceToPaymentLink.get(price.id) || null,
      }),
    );

    // 3. Group prices by product and interval
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

    // 4. Build result grouped by interval
    const result: PricingPlansByInterval = {
      month: productsData.data
        .map((product) => {
          const productPrices = pricesByProductAndInterval[product.id] || {};
          const features = this.extractFeatures(product);

          if (!productPrices.month) return null;

          return {
            id: product.id,
            name: product.name,
            active: product.active,
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
          const features = this.extractFeatures(product);

          if (!productPrices.year) return null;

          return {
            id: product.id,
            name: product.name,
            active: product.active,
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
