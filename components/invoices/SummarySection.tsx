import { View, Text } from "react-native";
import { InvoiceTotals } from "@/utils/calculateInvoiceTotals";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  totals: InvoiceTotals;
}

export default function SummarySection({ totals }: Props) {
  return (
    <View style={{ marginTop: 20, paddingBottom: 40 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Resume</Text>
      <Text>Sous-total: {formatCurrency(totals.subtotal)}</Text>
      <Text>Taxe: {formatCurrency(totals.taxAmount)}</Text>
      <Text style={{ fontWeight: "700" }}>Total: {formatCurrency(totals.total)}</Text>
    </View>
  );
}
