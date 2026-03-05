import { Invoice, CreateInvoiceDTO } from "@/types/invoice";
import api from "./api";

export const invoiceService = {
  async create(data: CreateInvoiceDTO): Promise<Invoice> {
    try {
      const response = await api.post<Invoice>("/invoices", data);
      return response.data;
    } catch {
      throw new Error("Erreur lors de la creation de la facture");
    }
  },
};
