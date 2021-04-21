import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2020-08-27",
});

export interface PaymentIntentData {
  amount: number;
  currency: string;
  metadata: Record<string, unknown>;
  setup_future_usage?: string;
  payment_method?: string;
  customer?: string;
  confirm?: boolean;
  off_session?: boolean;
}

export const createPaymentIntent = async (data: {
  amount: number;
  customer?: string;
  payment_method_id?: string;
  confirm?: boolean;
}) => {
  const { amount, payment_method_id, customer, confirm } = data;

  const paymentIntentData: PaymentIntentData = {
    amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  };
  if (payment_method_id) {
    paymentIntentData.payment_method = payment_method_id;
  }
  if (customer) {
    paymentIntentData.customer = customer;
  }
  if (confirm) {
    // to save card for future usage
    paymentIntentData.confirm = true;
    paymentIntentData.off_session = true;
  } else {
    paymentIntentData.setup_future_usage = "off_session";
  }

  console.log("payment intentent data is = ", paymentIntentData);
  //@ts-ignore
  return stripe.paymentIntents.create(paymentIntentData);
};
