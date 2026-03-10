import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useClientStore } from "@/store/useClientStore";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AppBadge from "@/components/ui/AppBadge";
import { Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function ClientsScreen() {
  const router = useRouter();
  const { clients } = useClientStore();
  const { colors } = useAppTheme();

  return (
    <AppScreen>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Clients</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Relation client claire et securisee.</Text>
        </View>
        <AppBadge label={`${clients.length} comptes`} tone="info" />
      </View>

      <PrimaryButton title="Ajouter un client" onPress={() => router.push("/client/create")} />

      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <AppCard>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Aucun client pour l'instant</Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Ajoute ton premier client pour commencer la facturation.</Text>
          </AppCard>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: "/client/[id]", params: { id: item.id } })}>
            <AppCard style={{ backgroundColor: colors.glassStrong }}>
              <View style={styles.row}>
                <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                <AppBadge label={item.isActive ? "Actif" : "Inactif"} tone={item.isActive ? "success" : "warning"} />
              </View>
              <Text style={[styles.meta, { color: colors.textMuted }]}>{item.email}</Text>
              {item.phone ? <Text style={[styles.meta, { color: colors.textMuted }]}>{item.phone}</Text> : null}
              <Text style={[styles.meta, { color: colors.textMuted }]}>Devise: {item.currency}</Text>
            </AppCard>
          </TouchableOpacity>
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
  },
  list: {
    paddingTop: Spacing.md,
    paddingBottom: 30,
    gap: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
  },
  meta: {
    marginTop: 6,
    fontSize: 13,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    marginTop: 6,
    fontSize: 13,
  },
});
