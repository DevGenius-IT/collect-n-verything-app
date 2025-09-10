export interface InvoiceResponse {
  id: string;
  object: "invoice";
  account_country: string;
  account_name: string;
  account_tax_ids: null;
  amount_due: number;
  amount_overpaid: number;
  amount_paid: number;
  amount_remaining: number;
  amount_shipping: number;
  application: null;
  application_fee_amount: null;
  attempt_count: number;
  attempted: boolean;
  auto_advance: boolean;
  automatic_tax: {
    disabled_reason: string | null;
    enabled: boolean;
    liability: string | null;
    provider: string | null;
    status: string | null;
  };
  automatically_finalizes_at: number | null;
  billing_reason: string;
  charge: string;
  collection_method: string;
  created: number;
  currency: string;
  custom_fields: null;
  customer: string;
  customer_address: null;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  customer_shipping: null;
  customer_tax_exempt: string;
  customer_tax_ids: any[];
  default_payment_method: string | null;
  default_source: string | null;
  default_tax_rates: any[];
  description: string | null;
  discount: null;
  discounts: any[];
  due_date: number | null;
  effective_at: number;
  ending_balance: number;
  footer: string | null;
  from_invoice: null;
  hosted_invoice_url: string;
  invoice_pdf: string;
  issuer: {
    type: string;
  };
  last_finalization_error: null;
  latest_revision: null;
  lines: {
    object: string;
    data: LineItem[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  livemode: boolean;
  metadata: any[];
  next_payment_attempt: number | null;
  number: string;
  on_behalf_of: string | null;
  paid: boolean;
  paid_out_of_band: boolean;
  parent: {
    quote_details: null;
    subscription_details: {
      metadata: any[];
      subscription: string;
    };
    type: string;
  };
  payment_intent: string;
  payment_settings: {
    default_mandate: string | null;
    payment_method_options: {
      acss_debit: any;
      bancontact: any;
      card: {
        request_three_d_secure: string;
      };
      customer_balance: any;
      konbini: any;
      sepa_debit: any;
      us_bank_account: any;
    };
    payment_method_types: string[];
  };
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  quote: null;
  receipt_number: string | null;
  rendering: null;
  rendering_options: null;
  shipping_cost: null;
  shipping_details: null;
  starting_balance: number;
  statement_descriptor: string | null;
  status: string;
  status_transitions: {
    finalized_at: number;
    marked_uncollectible_at: number | null;
    paid_at: number;
    voided_at: number | null;
  };
  subscription: string;
  subscription_details: {
    metadata: any[];
  };
  subtotal: number;
  subtotal_excluding_tax: number;
  tax: number | null;
  test_clock: null;
  total: number;
  total_discount_amounts: any[];
  total_excluding_tax: number;
  total_pretax_credit_amounts: any[];
  total_tax_amounts: any[];
  total_taxes: any[];
  transfer_data: null;
  webhooks_delivered_at: number;
}

export default InvoiceResponse;

interface LineItem {
  id: string;
  object: "line_item";
  amount: number;
  amount_excluding_tax: number;
  currency: string;
  description: string;
  discount_amounts: any[];
  discountable: boolean;
  discounts: any[];
  invoice: string;
  livemode: boolean;
  metadata: any[];
  parent: {
    invoice_item_details: null;
    subscription_item_details: {
      invoice_item: null;
      proration: boolean;
      proration_details: {
        credited_items: null;
      };
      subscription: string;
      subscription_item: string;
    };
    type: string;
  };
  period: {
    start: number;
    end: number;
  };
  plan: {
    id: string;
    object: string;
    active: boolean;
    aggregate_usage: string | null;
    amount: number;
    amount_decimal: string;
    billing_scheme: string;
    created: number;
    currency: string;
    interval: string;
    interval_count: number;
    livemode: boolean;
    metadata: any[];
    meter: null;
    nickname: string | null;
    product: string;
    tiers_mode: string | null;
    transform_usage: null;
    trial_period_days: number | null;
    usage_type: string;
  };
  pretax_credit_amounts: any[];
  price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null;
    livemode: boolean;
    lookup_key: string | null;
    metadata: any[];
    nickname: string | null;
    product: string;
    recurring: {
      aggregate_usage: string | null;
      interval: string;
      interval_count: number;
      meter: null;
      trial_period_days: number | null;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: string | null;
    transform_quantity: null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  pricing: {
    price_details: {
      price: string;
      product: string;
    };
    type: string;
    unit_amount_decimal: string;
  };
  proration: boolean;
  proration_details: {
    credited_items: null;
  };
  quantity: number;
  subscription: string;
  subscription_item: string;
  tax_amounts: any[];
  tax_rates: any[];
  taxes: any[];
  type: string;
  unit_amount_excluding_tax: string;
}
