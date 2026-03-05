import { create } from "zustand";
import { Invoice } from "@/types/invoice";
import { mockInvoices } from "@/data/mockInvoices";

interface InvoiceStore {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  updateInvoice: (updatedInvoice: Invoice) => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: mockInvoices,

  addInvoice: (invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),

    updateInvoice: (updatedInvoice) =>
  set((state) => ({
    invoices: state.invoices.map((inv) =>
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    ),
  })),

  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((inv) => inv.id !== id),
    })),
}));