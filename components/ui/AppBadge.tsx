import { StyleSheet, Text, View } from "react-native";
import { Radius } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  label: string;
  tone?: "info" | "success" | "warning" | "danger";
}

export default function AppBadge({ label, tone = "info" }: Props) {
  const { mode, colors } = useAppTheme();

  const toneStyles = {
    info: { backgroundColor: colors.primary, borderColor: colors.primary, color: "#FFFFFF" },
    success: { backgroundColor: colors.success, borderColor: colors.success, color: "#FFFFFF" },
    warning: { backgroundColor: colors.warning, borderColor: colors.warning, color: "#FFFFFF" },
    danger: { backgroundColor: colors.danger, borderColor: colors.danger, color: "#FFFFFF" },
  } as const;

  return (
    <View style={[styles.badge, { paddingVertical: mode === "dark" ? 5 : 4 }, toneStyles[tone]]}>
      <Text style={[styles.text, { color: toneStyles[tone].color }]} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 11,
    borderRadius: Radius.md,
    alignSelf: "flex-start",
    borderWidth: 1.2,
    maxWidth: 120,
  },
  text: {
    fontSize: 12.5,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
