import { loadStripe } from '@stripe/stripe-js';

export const shortLocale = 'US';
const stripe_pk = process.env.STRIPE_PK;
export const stripePromise = loadStripe(stripe_pk);