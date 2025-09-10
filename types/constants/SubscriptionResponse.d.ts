export interface SubscriptionResponse {
  status: "success" | string;
  last_subscription: {
    id: string;
    object: string;
    application: string | null;
    application_fee_percent: number | null;
    automatic_tax: {
      disabled_reason: string | null;
      enabled: boolean;
      liability: string | null;
    };
    billing_cycle_anchor: number;
    billing_cycle_anchor_config: any | null;
    billing_mode: {
      type: string;
    };
    billing_thresholds: any | null;
    cancel_at: number | null;
    cancel_at_period_end: boolean;
    canceled_at: number | null;
    cancellation_details: {
      comment: string | null;
      feedback: string | null;
      reason: string | null;
    };
    collection_method: string;
    created: number;
    currency: string;
    current_period_end: number;
    current_period_start: number;
    customer: string;
    days_until_due: number | null;
    default_payment_method: string;
    default_source: string | null;
    default_tax_rates: any[];
    description: string | null;
    discount: any | null;
    discounts: any[];
    ended_at: number | null;
    invoice_settings: {
      account_tax_ids: any | null;
      issuer: {
        type: string;
      };
    };
    items: {
      object: string;
      data: {
        id: string;
        object: string;
        billing_thresholds: any | null;
        created: number;
        current_period_end: number;
        current_period_start: number;
        discounts: any[];
        metadata: any[];
        plan: {
          id: string;
          object: string;
          active: boolean;
          aggregate_usage: any | null;
          amount: number;
          amount_decimal: string;
          billing_scheme: string;
          created: number;
          currency: string;
          interval: string;
          interval_count: number;
          livemode: boolean;
          metadata: any[];
          meter: any | null;
          nickname: string | null;
          product: string;
          tiers_mode: any | null;
          transform_usage: any | null;
          trial_period_days: number | null;
          usage_type: string;
        };
        price: {
          id: string;
          object: string;
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
          recurring: {
            aggregate_usage: any | null;
            interval: string;
            interval_count: number;
            meter: any | null;
            trial_period_days: number | null;
            usage_type: string;
          };
          tax_behavior: string;
          tiers_mode: any | null;
          transform_quantity: any | null;
          type: string;
          unit_amount: number;
          unit_amount_decimal: string;
        };
        quantity: number;
        subscription: string;
        tax_rates: any[];
      }[];
      has_more: boolean;
      total_count: number;
      url: string;
    };
    latest_invoice: string;
    livemode: boolean;
    metadata: any[];
    next_pending_invoice_item_invoice: any | null;
    on_behalf_of: any | null;
    pause_collection: any | null;
    payment_settings: {
      payment_method_options: {
        acss_debit: any | null;
        bancontact: any | null;
        card: {
          network: string | null;
          request_three_d_secure: string;
        };
        customer_balance: any | null;
        konbini: any | null;
        sepa_debit: any | null;
        us_bank_account: any | null;
      };
      payment_method_types: string[];
      save_default_payment_method: string;
    };
    pending_invoice_item_interval: any | null;
    pending_setup_intent: any | null;
    pending_update: any | null;
    plan: {
      id: string;
      object: string;
      active: boolean;
      aggregate_usage: any | null;
      amount: number;
      amount_decimal: string;
      billing_scheme: string;
      created: number;
      currency: string;
      interval: string;
      interval_count: number;
      livemode: boolean;
      metadata: any[];
      meter: any | null;
      nickname: string | null;
      product: string;
      tiers_mode: any | null;
      transform_usage: any | null;
      trial_period_days: number | null;
      usage_type: string;
    };
    quantity: number;
    schedule: any | null;
    start_date: number;
    status: "active" | "trialing" | "past_due" | "canceled" | "incomplete" | "incomplete_expired" | "unpaid";
    subscription_items: {}
    test_clock: any | null;
    transfer_data: any | null;
    trial_end: any | null;
    trial_settings: {
      end_behavior: {
        missing_payment_method: string;
      };
    };
    trial_start: any | null;
  };
}

export default SubscriptionResponse;