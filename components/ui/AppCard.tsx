import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Radius, Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function AppCard({ children, style }: Props) {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.glass,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          elevation: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1.1,
    padding: Spacing.md,
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
  },
});
