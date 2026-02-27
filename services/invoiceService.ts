import { Invoice, CreateInvoiceDTO } from "@/types/invoice";
import api from "./api";

export const invoiceService = {
  async create(data: CreateInvoiceDTO): Promise<Invoice> {
    try {
      const response = await api.post("/invoices", data);
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la création de la facture");
    }
  },
};