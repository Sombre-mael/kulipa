import { Invoice } from "@/types/invoice";

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    clientId: "c1",
    clientName: "Entreprise Alpha",
    items: [
      {
        id: "i1",
        description: "Service A",
        quantity: 2,
        unitPrice: 50000,
      },
    ],
    taxRate: 0.16,
    subtotal: 100000,
    taxAmount: 16000,
    total: 116000,
    currency: "USD",
    status: "paid",
    issuedAt: "2026-02-01",
    dueDate: "2026-02-10",
    createdAt: "2026-02-01",
  },
  {
    id: "2",
    clientId: "c2",
    clientName: "Beta SARL",
    items: [
      {
        id: "i2",
        description: "Consulting",
        quantity: 1,
        unitPrice: 80000,
      },
    ],
    taxRate: 0.16,
    subtotal: 80000,
    taxAmount: 12800,
    total: 92800,
    currency: "USD",
    status: "draft",
    issuedAt: "2026-02-05",
    dueDate: "2026-02-15",
    createdAt: "2026-02-05",
  },
];