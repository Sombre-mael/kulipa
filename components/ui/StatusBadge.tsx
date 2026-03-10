import { StyleSheet, Text, View } from "react-native";
import { InvoiceStatus } from "@/types/invoice";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  status: InvoiceStatus;
}

export default function StatusBadge({ status }: Props) {
  const { colors } = useAppTheme();

  const tone = {
    paid: colors.success,
    draft: colors.warning,
    overdue: colors.danger,
    sent: colors.primary,
  }[status];

  return (
    <View style={[styles.badge, { backgroundColor: tone }]}>
      <Text style={styles.text}>{status.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
    color: "#FFFFFF",
  },
});
