import { Text, View } from "react-native";
import { InvoiceTotals } from "@/utils/calculateInvoiceTotals";
import { formatCurrency } from "@/utils/formatCurrency";
import AppCard from "@/components/ui/AppCard";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  totals: InvoiceTotals;
}

export default function SummarySection({ totals }: Props) {
  const { colors } = useAppTheme();
  return (
    <AppCard style={{ marginTop: 12, backgroundColor: colors.glassStrong }}>
      <Text style={{ color: colors.text, fontWeight: "800", marginBottom: 8 }}>Resume</Text>
      <View style={{ gap: 4 }}>
        <Text style={{ color: colors.textMuted }}>Sous-total: {formatCurrency(totals.subtotal)}</Text>
        <Text style={{ color: colors.textMuted }}>Taxe: {formatCurrency(totals.taxAmount)}</Text>
        <Text style={{ color: colors.text, fontWeight: "800" }}>Total: {formatCurrency(totals.total)}</Text>
      </View>
    </AppCard>
  );
}
