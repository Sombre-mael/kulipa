import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import AppButton from "@/components/ui/AppButton";
import AppBadge from "@/components/ui/AppBadge";
import { Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();

  return (
    <AppScreen>
      <View style={styles.container}>
        <Text style={[styles.brand, { color: colors.primary }]}>Kulipa</Text>
        <Text style={[styles.title, { color: colors.text }]}>Financial app, design lumineux</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Connexion simple, transparence claire, et suivi facture en temps reel.
        </Text>

        <AppCard style={{ backgroundColor: colors.glassStrong }}>
          <View style={styles.row}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Onboarding fluide</Text>
            <AppBadge label="Google / Apple / SMS" tone="info" />
          </View>
          <View style={styles.stack}>
            <AppButton title="Continuer avec Google" onPress={() => router.replace("/(tabs)/dashboard")} />
            <AppButton title="Continuer avec Apple" onPress={() => router.replace("/(tabs)/dashboard")} variant="secondary" />
            <AppButton title="Continuer par SMS" onPress={() => router.replace("/(tabs)/dashboard")} variant="secondary" />
          </View>
        </AppCard>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", gap: Spacing.md, paddingBottom: 70 },
  brand: { textTransform: "uppercase", letterSpacing: 1, fontSize: 12, fontWeight: "700" },
  title: { fontSize: 34, lineHeight: 38, fontWeight: "900" },
  subtitle: { fontSize: 15, lineHeight: 22 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: Spacing.sm },
  cardTitle: { fontSize: 16, fontWeight: "800" },
  stack: { marginTop: 12, gap: 8 },
});
