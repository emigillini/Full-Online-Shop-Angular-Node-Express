import Stripe from 'stripe';
import stripe from '../config/stripe';

export class StripeService {
    static async createPaymentIntent(amount: number, currency: string = 'eur'): Promise<Stripe.PaymentIntent> {
        try {
            const intent = await stripe.paymentIntents.create({
                amount,
                currency,
                automatic_payment_methods: { enabled: true, allow_redirects: "never" },
            });
            return intent;
        } catch (error) {
            throw new Error(`Error creating payment intent: ${(error as Error).message}`);
        }
    }

    static async confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string): Promise<Stripe.PaymentIntent> {
        try {
            const intent = await stripe.paymentIntents.confirm(paymentIntentId, {
                payment_method: paymentMethodId,
            });
            return intent;
        } catch (error) {
            throw new Error(`Error confirming payment intent: ${(error as Error).message}`);
        }
    }
}
