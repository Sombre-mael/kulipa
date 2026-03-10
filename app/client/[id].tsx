import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useClientStore } from "@/store/useClientStore";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import AppBadge from "@/components/ui/AppBadge";
import AppButton from "@/components/ui/AppButton";
import { Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function ClientDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useAppTheme();
  const { clients, deleteClient } = useClientStore();
  const { invoices } = useInvoiceStore();
  const client = clients.find((entry) => entry.id === String(id));

  if (!client) return null;

  const clientInvoices = invoices.filter((inv) => inv.clientId === client.id);

  return (
    <AppScreen>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>{client.name}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Fiche client</Text>
        </View>
        <AppBadge label={client.isActive ? "Actif" : "Inactif"} tone={client.isActive ? "success" : "warning"} />
      </View>

      <AppCard style={{ backgroundColor: colors.glassStrong }}>
        <Text style={[styles.line, { color: colors.textMuted }]}>Email: {client.email}</Text>
        {client.phone ? <Text style={[styles.line, { color: colors.textMuted }]}>Telephone: {client.phone}</Text> : null}
        {client.address ? <Text style={[styles.line, { color: colors.textMuted }]}>Adresse: {client.address}</Text> : null}
        <Text style={[styles.line, { color: colors.textMuted }]}>Devise: {client.currency}</Text>
      </AppCard>

      <Text style={[styles.section, { color: colors.text }]}>Factures associees</Text>
      <View style={styles.stack}>
        {clientInvoices.length === 0 ? (
          <AppCard>
            <Text style={{ color: colors.textMuted }}>Aucune facture pour ce client.</Text>
          </AppCard>
        ) : (
          clientInvoices.map((invoice) => (
            <AppCard key={invoice.id} style={{ backgroundColor: colors.glassStrong }}>
              <View style={styles.row}>
                <Text style={[styles.amount, { color: colors.text }]}>
                  {(invoice.total / 100).toFixed(2)} {invoice.currency}
                </Text>
                <AppBadge label={invoice.status.toUpperCase()} tone={invoice.status === "paid" ? "success" : "warning"} />
              </View>
            </AppCard>
          ))
        )}
      </View>

      <View style={styles.actions}>
        <AppButton title="Modifier" onPress={() => router.push({ pathname: "/client/edit/[id]", params: { id: client.id } })} />
        <AppButton title="Supprimer" variant="danger" onPress={() => { deleteClient(client.id); router.replace("/(tabs)/clients"); }} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: Spacing.sm },
  title: { fontSize: 30, fontWeight: "900" },
  subtitle: { marginTop: 4 },
  line: { marginTop: 4, fontSize: 14 },
  section: { marginTop: Spacing.md, fontSize: 16, fontWeight: "800" },
  stack: { marginTop: Spacing.sm, gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: Spacing.sm },
  amount: { fontWeight: "800", fontSize: 16 },
  actions: { marginTop: Spacing.md, gap: 8, paddingBottom: 90 },
});
