export function formatCurrency(amountInCents: number): string {
  return (amountInCents / 100).toFixed(2);
}