import { InvoiceItem } from "@/types/invoice";

export interface InvoiceTotals {
  subtotal: number;
  taxAmount: number;
  total: number;
}

export function calculateInvoiceTotals(
  items: InvoiceItem[],
  taxRate: number
): InvoiceTotals {
  const subtotal = items.reduce((acc, item) => {
    return acc + item.quantity * item.unitPrice;
  }, 0);

  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return {
    subtotal,
    taxAmount,
    total,
  };
}