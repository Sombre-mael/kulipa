import { View, Text, FlatList, Alert, Pressable, Share, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import AppButton from "@/components/ui/AppButton";
import StatusBadge from "@/components/ui/StatusBadge";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import AppBadge from "@/components/ui/AppBadge";
import { Spacing } from "@/constants/design";
import {
  buildPaymentShareMessage,
  generatePaymentLink,
} from "@/services/paymentService";
import * as Sharing from "expo-sharing";
import { generateInvoicePDF } from "@/services/pdfService";
import { useAppTheme } from "@/providers/AppThemeProvider";
import { useClientStore } from "@/store/useClientStore";

export default function InvoiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors } = useAppTheme();
  const { invoices, deleteInvoice, updateInvoice } = useInvoiceStore();
  const invoice = invoices.find((inv) => inv.id === String(id));
  const { clients } = useClientStore();
  const client = invoice
    ? clients.find((entry) => entry.id === invoice.clientId)
    : undefined;

  const handleSendInvoice = () => {
    if (!invoice) return;

    const paymentLink = generatePaymentLink({
      invoiceId: invoice.id,
      amountInCents: invoice.total,
      currency: invoice.currency,
      clientName: client?.name,
    });

    const message = buildPaymentShareMessage(
      {
        invoiceId: invoice.id,
        amountInCents: invoice.total,
        currency: invoice.currency,
        clientName: client?.name,
      },
      paymentLink
    );

    updateInvoice({
      ...invoice,
      status: "sent",
    });

    Share.share({
      title: `Facture #${invoice.id}`,
      message,
    }).catch(() => {
      Alert.alert("Facture envoyee", `Lien de paiement:\n${paymentLink}`);
    });
  };

  if (!invoice) {
    return (
      <AppScreen>
        <Text style={{ color: colors.text }}>Facture introuvable</Text>
      </AppScreen>
    );
  }

  const handleGeneratePDF = async () => {
    if (!invoice || !client) {
      Alert.alert("Erreur", "Impossible de generer le PDF (client introuvable).");
      return;
    }

    try {
      const pdfUri = await generateInvoicePDF(invoice, client);
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (isSharingAvailable) {
        await Sharing.shareAsync(pdfUri);
      } else {
        Alert.alert("PDF genere", `Fichier: ${pdfUri}`);
      }
    } catch {
      Alert.alert("Erreur", "La generation du PDF a echoue.");
    }
  };

  const handleDelete = () => {
    Alert.alert("Confirmation", "Voulez-vous vraiment supprimer cette facture ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          deleteInvoice(invoice.id);
          router.replace("/(tabs)/invoices");
        },
      },
    ]);
  };

  const handleToggleStatus = () => {
    const newStatus = invoice.status === "paid" ? "draft" : "paid";
    updateInvoice({ ...invoice, status: newStatus });
    router.replace("/(tabs)/invoices");
  };

  return (
    <AppScreen>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Facture #{invoice.id}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Parcours de paiement</Text>
        </View>
        <AppBadge label="Facture" tone="info" />
      </View>

      <AppCard style={{ marginTop: Spacing.md, backgroundColor: colors.glassStrong }}>
        <View style={styles.topRow}>
          <StatusBadge status={invoice.status} />
          <Text style={{ color: colors.textMuted, fontSize: 13 }}>Echeance: {invoice.dueDate}</Text>
        </View>
        <Text style={[styles.total, { color: colors.text }]}>
          {(invoice.total / 100).toFixed(2)} {invoice.currency}
        </Text>
      </AppCard>

      <Text style={[styles.section, { color: colors.text }]}>Items</Text>
      <FlatList
        data={invoice.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8, paddingTop: 8, paddingBottom: 8 }}
        renderItem={({ item }) => (
          <AppCard style={{ backgroundColor: colors.glassStrong }}>
            <Text style={{ color: colors.text, fontWeight: "700" }}>{item.description}</Text>
            <Text style={{ marginTop: 5, color: colors.textMuted, fontSize: 13 }}>
              {item.quantity} x {(item.unitPrice / 100).toFixed(2)}
            </Text>
          </AppCard>
        )}
      />

      <View style={styles.actions}>
        <AppButton title={invoice.status === "paid" ? "Marquer non payee" : "Marquer payee"} onPress={handleToggleStatus} />
        <View style={styles.rowButtons}>
          <AppButton title="Envoyer" variant="secondary" onPress={handleSendInvoice} style={styles.halfButton} />
          <AppButton title="PDF" variant="secondary" onPress={handleGeneratePDF} style={styles.halfButton} />
        </View>
        <View style={styles.linkRow}>
          <Pressable onPress={() => router.push({ pathname: "/invoice/edit/[id]", params: { id: invoice.id } })}>
            <Text style={[styles.linkText, { color: colors.primary }]}>Modifier</Text>
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Text style={[styles.linkText, { color: colors.danger }]}>Supprimer</Text>
          </Pressable>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: Spacing.sm },
  title: { fontSize: 28, fontWeight: "900" },
  subtitle: { marginTop: 4 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: Spacing.sm },
  total: { marginTop: 12, fontSize: 30, fontWeight: "900" },
  section: { marginTop: Spacing.md, fontSize: 16, fontWeight: "800" },
  actions: { gap: 10, paddingBottom: 90 },
  rowButtons: {
    flexDirection: "row",
    gap: 8,
  },
  halfButton: {
    flex: 1,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: 2,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
