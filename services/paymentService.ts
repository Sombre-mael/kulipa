interface PaymentLinkInput {
  invoiceId: string;
  amountInCents: number;
  currency: string;
  clientName?: string;
}

export function generatePaymentLink(input: PaymentLinkInput) {
  const baseUrl =
    process.env.EXPO_PUBLIC_STRIPE_CHECKOUT_URL ??
    "https://checkout.stripe.com/pay/mock-session";

  const query = [
    `ref=${encodeURIComponent(input.invoiceId)}`,
    `amount=${encodeURIComponent(String(input.amountInCents))}`,
    `currency=${encodeURIComponent(input.currency.toLowerCase())}`,
  ].join("&");

  return `${baseUrl}?${query}`;
}

export function buildPaymentShareMessage(input: PaymentLinkInput, paymentLink: string) {
  const amount = `${(input.amountInCents / 100).toFixed(2)} ${input.currency}`;
  const recipient = input.clientName ? `Bonjour ${input.clientName},` : "Bonjour,";

  return `${recipient}

Veuillez regler la facture #${input.invoiceId}.
Montant: ${amount}

Paiement securise (Stripe):
${paymentLink}

Merci.`;
}
