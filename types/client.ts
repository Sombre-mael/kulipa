export interface Client {
  id: string; // UUID venant de Supabase
  name: string;
  email: string;
  phone?: string;
  address?: string;
  currency: string; // ex: "USD", "EUR", "CDF"
  isActive: boolean;
  createdAt: string; // ISO date string
}