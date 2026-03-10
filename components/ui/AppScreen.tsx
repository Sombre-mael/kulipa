import { ReactNode } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";
import ThemeSwitch from "@/components/ui/ThemeSwitch";

interface Props {
  children: ReactNode;
  showThemeSwitch?: boolean;
}

export default function AppScreen({ children, showThemeSwitch = true }: Props) {
  const { colors, mode } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={mode === "light" ? "dark-content" : "light-content"} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.bg,
            paddingTop: Spacing.xs,
            paddingBottom: insets.bottom + Spacing.sm,
          },
        ]}
      >
        {showThemeSwitch ? (
          <View style={styles.topBar}>
            <ThemeSwitch />
          </View>
        ) : null}
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  topBar: {
    alignItems: "flex-end",
    marginTop: -2,
    marginBottom: Spacing.xs,
  },
});
