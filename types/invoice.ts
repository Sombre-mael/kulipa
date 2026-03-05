import { Client } from "./client";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number; // en centimes
}

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue";

export interface Invoice {
  id: string;
  clientId: string;
  clientName?: string;
  items: InvoiceItem[];
  taxRate: number; // ex: 0.16
  subtotal: number;   // en centimes
  taxAmount: number;  // en centimes
  total: number;      // en centimes
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
  createdAt: string;
}

export interface CreateInvoiceDTO {
  clientId: string;
  items: InvoiceItem[];
  taxRate: number;
  issuedAt: string;
  dueDate: string;
}