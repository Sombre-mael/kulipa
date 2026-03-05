import { create } from "zustand";
import { Client } from "@/types/client";

interface ClientStore {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (updated: Client) => void;
  deleteClient: (id: string) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],

  addClient: (client) =>
    set((state) => ({
      clients: [...state.clients, client],
    })),

  updateClient: (updated) =>
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === updated.id ? updated : c
      ),
    })),

  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((c) => c.id !== id),
    })),
}));