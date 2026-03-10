import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/providers/AppThemeProvider";
import { Radius } from "@/constants/design";

export default function ThemeSwitch() {
  const { mode, colors, toggleMode } = useAppTheme();

  return (
    <Pressable
      onPress={toggleMode}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.glassStrong,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Ionicons
        name={mode === "light" ? "moon-outline" : "sunny-outline"}
        size={18}
        color={colors.text}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: Radius.xl,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
});
