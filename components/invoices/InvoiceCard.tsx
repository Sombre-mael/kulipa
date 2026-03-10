import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Invoice } from "@/types/invoice";
import StatusBadge from "../ui/StatusBadge";
import { useClientStore } from "@/store/useClientStore";
import { formatDate } from "@/utils/formatDate";
import { Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  invoice: Invoice;
  onPress: () => void;
}

export default function InvoiceCard({ invoice, onPress }: Props) {
  const { clients } = useClientStore();
  const { colors } = useAppTheme();
  const client = clients.find((entry) => entry.id === invoice.clientId);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.glassStrong, borderColor: colors.border }]}
    >
      <View style={styles.row}>
        <Text style={[styles.clientName, { color: colors.text }]}>{client ? client.name : "Client inconnu"}</Text>
        <StatusBadge status={invoice.status} />
      </View>

      <Text style={[styles.amount, { color: colors.text }]}>
        {(invoice.total / 100).toFixed(2)} {invoice.currency}
      </Text>

      <Text style={[styles.meta, { color: colors.textMuted }]}>Echeance: {formatDate(invoice.dueDate)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  clientName: {
    fontWeight: "800",
    fontSize: 16,
    flex: 1,
  },
  amount: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "900",
  },
  meta: {
    marginTop: 8,
    fontSize: 13,
  },
});
