import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Radius } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
}

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  style,
}: Props) {
  const { colors } = useAppTheme();
  const bgByVariant = {
    primary: colors.primary,
    secondary: colors.glassStrong,
    danger: colors.danger,
  } as const;

  const borderByVariant = {
    primary: colors.primary,
    secondary: colors.border,
    danger: colors.danger,
  } as const;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bgByVariant[variant],
          borderColor: borderByVariant[variant],
          shadowColor: colors.shadow,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.title, { color: variant === "primary" ? "#FFFFFF" : colors.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
