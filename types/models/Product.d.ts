export interface Recurring {
  aggregate_usage: string | null;
  interval: 'month' | 'year' | 'week' | 'day';
  interval_count: number;
  meter: string | null;
  trial_period_days: number | null;
  usage_type: 'licensed' | 'metered';
}

export interface Price {
  id: string;
  object: 'price';
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: any | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: any[];
  nickname: string | null;
  product: string;
  recurring: Recurring | null;
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: any | null;
  type: 'recurring' | 'one_time';
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface Product {
  id: string;
  object: 'product';
  active: boolean;
  attributes: any[];
  created: number;
  default_price: string;
  description: string;
  images: string[];
  livemode: boolean;
  marketing_features: any[];
  metadata: {
    order: string,
    enDescription: string,
  };
  name: string;
  package_dimensions: any | null;
  shippable: boolean | null;
  statement_descriptor: string | null;
  tax_code: string | null;
  type: 'service' | 'good';
  unit_label: string | null;
  updated: number;
  url: string | null;
  prices: Price[];
}