import { Client } from "./client";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue";

export interface Invoice {
  id: string;
  clientId: string; // relation backend
  client?: Client;  // optionnel si jointure
  items: InvoiceItem[];
  taxRate: number; // ex: 0.16
  subtotal: number;
  taxAmount: number;
  total: number;
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