import { ScrollView, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { Invoice, InvoiceItem } from "@/types/invoice";
import { calculateInvoiceTotals } from "@/utils/calculateInvoiceTotals";
import ClientSection from "@/components/invoices/ClientSection";
import InvoiceInfoSection from "@/components/invoices/InvoiceInfoSection";
import ItemsSection from "@/components/invoices/ItemsSection";
import TaxSection from "@/components/invoices/TaxSection";
import SummarySection from "@/components/invoices/SummarySection";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import AppButton from "@/components/ui/AppButton";
import ClientSelector from "@/components/clients/ClientSelector";
import AppScreen from "@/components/ui/AppScreen";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function CreateInvoiceScreen() {
  const [clientId, setClientId] = useState<string | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [taxRate, setTaxRate] = useState(0.16);
  const totals = calculateInvoiceTotals(items, taxRate);
  const { colors } = useAppTheme();
  const { addInvoice } = useInvoiceStore();
  const router = useRouter();

  const handleSave = () => {
    if (!clientId || items.length === 0) return;

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      clientId,
      items,
      taxRate,
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      total: totals.total,
      currency: "USD",
      status: "draft",
      issuedAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    addInvoice(newInvoice);
    router.replace("/(tabs)/invoices");
  };

  return (
    <AppScreen>
      <Text style={[styles.title, { color: colors.text }]}>Nouvelle facture</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ClientSection clientId={clientId} setClientId={setClientId} />
        <ClientSelector selectedClientId={clientId} onSelect={setClientId} />
        <InvoiceInfoSection />
        <ItemsSection items={items} setItems={setItems} />
        <TaxSection taxRate={taxRate} setTaxRate={setTaxRate} />
        <SummarySection totals={totals} />
        <AppButton title="Enregistrer la facture" onPress={handleSave} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: "900" },
  content: { paddingBottom: 90 },
});
