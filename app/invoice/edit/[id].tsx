import { ScrollView, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { InvoiceItem } from "@/types/invoice";
import ItemsSection from "@/components/invoices/ItemsSection";
import TaxSection from "@/components/invoices/TaxSection";
import SummarySection from "@/components/invoices/SummarySection";
import AppButton from "@/components/ui/AppButton";
import AppScreen from "@/components/ui/AppScreen";
import { calculateInvoiceTotals } from "@/utils/calculateInvoiceTotals";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function EditInvoiceScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useAppTheme();
  const { invoices, updateInvoice } = useInvoiceStore();
  const invoice = invoices.find((inv) => inv.id === String(id));

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
    <AppScreen>
      <Text style={[styles.title, { color: colors.text }]}>Modifier facture</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ItemsSection items={items} setItems={setItems} />
        <TaxSection taxRate={taxRate} setTaxRate={setTaxRate} />
        <SummarySection totals={totals} />
        <AppButton title="Enregistrer les modifications" onPress={handleSave} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: "900" },
  content: { paddingBottom: 90 },
});
