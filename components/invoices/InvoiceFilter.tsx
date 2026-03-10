import { View, Pressable, Text, StyleSheet } from "react-native";
import { InvoiceStatus } from "@/types/invoice";
import { Radius, Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

type Filter = "all" | InvoiceStatus;

interface Props {
  selected: Filter;
  onChange: (filter: Filter) => void;
}

export default function InvoiceFilter({ selected, onChange }: Props) {
  const filters: Filter[] = ["all", "paid", "draft", "overdue"];
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      {filters.map((filter) => {
        const active = selected === filter;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            style={[
              styles.pill,
              { backgroundColor: colors.glassStrong, borderColor: colors.border },
              active && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
          >
            <Text style={[styles.text, { color: colors.textMuted }, active && styles.textActive]}>{filter.toUpperCase()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 8,
    marginTop: Spacing.md,
    marginBottom: 4,
  },
  pill: {
    borderRadius: Radius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
  },
  textActive: {
    color: "#FFFFFF",
  },
});
