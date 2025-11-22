import { Injectable, InternalServerErrorException } from '@nestjs/common';

interface StripeProduct {
  id: string;
  name: string;
  object: string;
  active: boolean;
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

  async getPricingPlansWithPricesAndLinks(): Promise<PricingPlansByInterval> {
    // 1. Fetch products and prices concurrently
    const [productsData, pricesData] = await Promise.all([
      this.stripeFetch<StripeListResponse<StripeProduct>>(
        'products',
        new URLSearchParams({ limit: '100' }),
      ),
      this.stripeFetch<StripeListResponse<StripePrice>>(
        'prices',
        new URLSearchParams({ limit: '100' }),
      ),
    ]);

    // 2. For each price, fetch the first payment link containing that price
    const pricesWithLinks = await Promise.all(
      pricesData.data.map(
        async (price: StripePrice): Promise<PriceWithLink> => {
          // fetch payment links filtering by price
          const paymentLinksData = await this.stripeFetch<
            StripeListResponse<StripePaymentLink>
          >(
            'payment_links',
            new URLSearchParams({
              limit: '1',
              'expand[]': 'data.line_items.data.price',
            }),
          );

          // find the first link that includes this price
          let paymentLink: string | null = null;
          for (const link of paymentLinksData.data) {
            if (
              link.line_items?.data?.some(
                (item: StripeLineItem) => item.price?.id === price.id,
              )
            ) {
              paymentLink = link.url;
              break;
            }
          }

          return {
            ...price,
            payment_link: paymentLink,
          };
        },
      ),
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
      month: [],
      year: [],
    };

    for (const product of productsData.data) {
      const productPrices = pricesByProductAndInterval[product.id] || {};

      // Add monthly plan if exists
      if (productPrices.month) {
        result.month.push({
          id: product.id,
          name: product.name,
          active: product.active,
          prices: {
            currency: productPrices.month.currency,
            amount: productPrices.month.unit_amount,
          },
          payment_link: productPrices.month.payment_link,
        });
      }

      // Add yearly plan if exists
      if (productPrices.year) {
        result.year.push({
          id: product.id,
          name: product.name,
          active: product.active,
          prices: {
            currency: productPrices.year.currency,
            amount: productPrices.year.unit_amount,
          },
          payment_link: productPrices.year.payment_link,
        });
      }
    }

    return result;
  }
}
