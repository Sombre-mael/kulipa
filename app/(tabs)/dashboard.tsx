import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppBadge from "@/components/ui/AppBadge";
import { Radius, Spacing } from "@/constants/design";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { useAppTheme } from "@/providers/AppThemeProvider";

function formatAmount(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function DashboardScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { invoices } = useInvoiceStore();
  const [usdAmount, setUsdAmount] = useState("1200");
  const [usdToCdfRate, setUsdToCdfRate] = useState("2850");

  const paid = invoices.filter((inv) => inv.status === "paid");
  const pending = invoices.filter((inv) => inv.status !== "paid");
  const overdue = invoices.filter((inv) => inv.status === "overdue");

  const totalPaid = paid.reduce((acc, inv) => acc + inv.total, 0);
  const totalPending = pending.reduce((acc, inv) => acc + inv.total, 0);
  const paidRate = invoices.length === 0 ? 0 : Math.round((paid.length / invoices.length) * 100);
  const overdueRate = invoices.length === 0 ? 0 : Math.round((overdue.length / invoices.length) * 100);

  const cdfAmount = useMemo(() => {
    const usd = Number(usdAmount) || 0;
    const rate = Number(usdToCdfRate) || 0;
    return (usd * rate).toLocaleString("fr-FR", { maximumFractionDigits: 0 });
  }, [usdAmount, usdToCdfRate]);

  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerTop}>
          <Text style={[styles.kicker, { color: colors.primary }]}>Kulipa Finance</Text>
          <View style={styles.badgeWrap}>
            <AppBadge label="Global" tone="info" />
          </View>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Tableau de bord</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>Navigation compartimentee, claire et rapide.</Text>

        <Animated.View entering={FadeInUp.springify().damping(18).delay(40)}>
          <AppCard style={[styles.hero, { backgroundColor: colors.glassStrong }]}>
            <Text style={[styles.heroLabel, { color: colors.textMuted }]}>Encaissements</Text>
            <Text style={[styles.heroValue, { color: colors.text }]}>{formatAmount(totalPaid)}</Text>
            <View style={styles.heroRow}>
              <Text style={[styles.heroMeta, { color: colors.textMuted }]}>Taux de paiement</Text>
              <Text style={[styles.heroMetaStrong, { color: colors.success }]}>{paidRate}%</Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: colors.bgSoft }]}>
              <View style={[styles.progressFill, { width: `${paidRate}%`, backgroundColor: colors.primary }]} />
            </View>
          </AppCard>
        </Animated.View>

        <View style={styles.grid}>
          <Animated.View style={styles.half} entering={FadeInUp.springify().damping(18).delay(80)}>
            <AppCard style={{ backgroundColor: colors.glassStrong }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>A relancer</Text>
              <Text style={[styles.cardValue, { color: colors.text }]}>{pending.length}</Text>
              <Text style={[styles.cardSub, { color: colors.textMuted }]}>{formatAmount(totalPending)} en attente</Text>
            </AppCard>
          </Animated.View>

          <Animated.View style={styles.half} entering={FadeInUp.springify().damping(18).delay(120)}>
            <AppCard style={{ backgroundColor: colors.glassStrong }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Transparence</Text>
              <Text style={[styles.line, { color: colors.textMuted }]}>Frais affiches: 0.00%</Text>
              <Text style={[styles.line, { color: colors.textMuted }]}>Retards: {overdueRate}%</Text>
              <Text style={[styles.line, { color: colors.textMuted }]}>Litiges: 0</Text>
            </AppCard>
          </Animated.View>

          <Animated.View style={styles.half} entering={FadeInUp.springify().damping(18).delay(160)}>
            <AppCard style={{ backgroundColor: colors.glassStrong }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Actions</Text>
              <View style={styles.stack}>
                <AppButton title="Creer une facture" onPress={() => router.push("/invoice/create")} />
                <AppButton title="Ajouter un client" onPress={() => router.push("/client/create")} variant="secondary" />
              </View>
            </AppCard>
          </Animated.View>

          <Animated.View style={styles.half} entering={FadeInUp.springify().damping(18).delay(200)}>
            <AppCard style={{ backgroundColor: colors.glassStrong }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Simulateur USD/CDF</Text>
              <AppInput placeholder="Montant USD" keyboardType="numeric" value={usdAmount} onChangeText={setUsdAmount} />
              <AppInput placeholder="Taux USD -> CDF" keyboardType="numeric" value={usdToCdfRate} onChangeText={setUsdToCdfRate} />
              <View style={[styles.result, { borderColor: colors.border, backgroundColor: colors.glass }]}>
                <Text style={[styles.resultLabel, { color: colors.textMuted }]}>Resultat</Text>
                <Text style={[styles.resultValue, { color: colors.text }]}>{cdfAmount} CDF</Text>
              </View>
            </AppCard>
          </Animated.View>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 124 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  badgeWrap: {
    flexShrink: 0,
  },
  kicker: { fontSize: 12, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase" },
  title: { fontSize: 32, fontWeight: "900", marginTop: 8 },
  subtitle: { marginTop: 6, fontSize: 14, maxWidth: 260 },
  hero: {
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
  },
  heroLabel: { fontSize: 13 },
  heroValue: { fontSize: 34, fontWeight: "900", marginTop: 6 },
  heroRow: { marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  heroMeta: { fontSize: 13 },
  heroMetaStrong: { fontWeight: "800" },
  progressTrack: { marginTop: 10, height: 8, borderRadius: 8, overflow: "hidden" },
  progressFill: { height: "100%" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm, marginTop: Spacing.sm },
  half: { width: "48%" },
  cardTitle: { fontSize: 15, fontWeight: "800" },
  cardValue: { marginTop: 8, fontSize: 28, fontWeight: "900" },
  cardSub: { marginTop: 4, fontSize: 13 },
  line: { marginTop: 7, fontSize: 13 },
  stack: { marginTop: 10, gap: 8 },
  result: { marginTop: 12, borderWidth: 1, borderRadius: Radius.md, padding: 10 },
  resultLabel: { fontSize: 12 },
  resultValue: { marginTop: 4, fontSize: 20, fontWeight: "800" },
});
