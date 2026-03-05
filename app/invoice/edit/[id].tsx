import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import { useInvoiceStore } from "@/store/useInvoiceStore";
import { InvoiceItem } from "@/types/invoice";

import ItemsSection from "@/components/invoices/ItemsSection";
import TaxSection from "@/components/invoices/TaxSection";
import SummarySection from "@/components/invoices/SummarySection";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { calculateInvoiceTotals } from "@/utils/calculateInvoiceTotals";

export default function EditInvoiceScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { invoices, updateInvoice } = useInvoiceStore();
  const invoice = invoices.find((inv) => inv.id === String(id));

    // états locaux du formulaire
    const [items, setItems] = useState<InvoiceItem[]>(invoice?.items ?? []);
    const [taxRate, setTaxRate] = useState(invoice?.taxRate ?? 0);

  const totals = calculateInvoiceTotals(items, taxRate);
  if (!invoice) return null;

  const handleSave = () => {
    updateInvoice({
      ...invoice,
      items,
      taxRate,
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      total: totals.total,
    });

    router.replace("/(tabs)/invoices");
  };

  return (
    <View style={{ padding: 20 }}>

      <ItemsSection
        items={items}
        setItems={setItems}
      />

      <TaxSection
        taxRate={taxRate}
        setTaxRate={setTaxRate}
      />

      <SummarySection totals={totals} />

      <PrimaryButton
        title="Enregistrer les modifications"
        onPress={handleSave}
      />

    </View>
  );
}