import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import InvoiceCard from "@/components/invoices/InvoiceCard";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import PrimaryButton from "@/components/ui/PrimaryButton";
import InvoiceFilter from "@/components/invoices/InvoiceFilter";
import { InvoiceStatus } from "@/types/invoice";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import AppBadge from "@/components/ui/AppBadge";
import { Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function InvoicesScreen() {
  const router = useRouter();
  const { invoices } = useInvoiceStore();
  const { colors } = useAppTheme();
  const [filter, setFilter] = useState<"all" | InvoiceStatus>("all");

  const filteredInvoices = filter === "all" ? invoices : invoices.filter((inv) => inv.status === filter);

  return (
    <AppScreen>
      <View style={styles.headerTop}>
        <Text style={[styles.title, { color: colors.text }]}>Factures</Text>
        <View style={styles.badgeWrap}>
          <AppBadge label={`${filteredInvoices.length} visibles`} tone="info" />
        </View>
      </View>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>Traque le parcours du brouillon au paiement.</Text>

      <InvoiceFilter selected={filter} onChange={setFilter} />

      <PrimaryButton title="Nouvelle facture" onPress={() => router.push("/invoice/create")} />

      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <AppCard>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Aucune facture sur ce filtre</Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Cree une facture pour activer le suivi de paiements.</Text>
          </AppCard>
        }
        renderItem={({ item }) => (
          <InvoiceCard invoice={item} onPress={() => router.push({ pathname: "/invoice/[id]", params: { id: item.id } })} />
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  badgeWrap: {
    flexShrink: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
  },
  list: {
    paddingTop: Spacing.md,
    paddingBottom: 30,
    gap: Spacing.sm,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    marginTop: 6,
    fontSize: 13,
  },
});
