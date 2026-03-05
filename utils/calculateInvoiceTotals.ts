import { InvoiceItem } from "@/types/invoice";

export interface InvoiceTotals {
  subtotal: number;   // en centimes
  taxAmount: number;  // en centimes
  total: number;      // en centimes
}

export function calculateInvoiceTotals(
  items: InvoiceItem[],
  taxRate: number
): InvoiceTotals {
  const subtotal = items.reduce((acc, item) => {
    return acc + item.quantity * item.unitPrice;
  }, 0);

  const taxAmount = Math.round(subtotal * taxRate);

  const total = subtotal + taxAmount;

  return {
    subtotal,
    taxAmount,
    total,
  };
}