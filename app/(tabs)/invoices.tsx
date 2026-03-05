import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import InvoiceCard from "@/components/invoices/InvoiceCard";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import PrimaryButton from "@/components/ui/PrimaryButton";
import InvoiceFilter from "@/components/invoices/InvoiceFilter";
import { InvoiceStatus } from "@/types/invoice";

export default function InvoicesScreen() {
  const router = useRouter();
  const { invoices } = useInvoiceStore();
  const [filter, setFilter] = useState<"all" | InvoiceStatus>("all");

  const filteredInvoices = 
    filter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Factures
      </Text>

      <InvoiceFilter selected={filter} onChange={setFilter}/>

    <PrimaryButton
      title="Nouvelle facture"
      onPress={() => router.push("/invoice/create")}
    />

      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InvoiceCard
            invoice={item}
            onPress={() => router.push(`/invoice/${item.id}`)}
          />
        )}
      />
    </View>
  );
}