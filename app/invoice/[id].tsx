import { View, Text, FlatList, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import PrimaryButton from "@/components/ui/PrimaryButton";
import StatusBadge from "@/components/ui/StatusBadge";

export default function InvoiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { invoices, deleteInvoice, updateInvoice } = useInvoiceStore();

  const invoice = invoices.find((inv) => inv.id === String(id));

  const handleDelete = () => {
  if (!invoice) return;

  Alert.alert(
    "Confirmation",
    "Voulez-vous vraiment supprimer cette facture ?",
    [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          deleteInvoice(invoice.id);
          router.replace("/(tabs)/invoices");
        },
      },
    ]
  );
  };

  const handleToggleStatus = () => {
    if (!invoice) return;

    const newStatus = invoice.status === "paid" ? "draft" : "paid";

    updateInvoice({
      ...invoice,
      status: newStatus,
    });

    router.replace("/(tabs)/invoices")
  };

  if (!invoice) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Facture introuvable</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {invoice.clientName}
      </Text>

      <StatusBadge status={invoice.status}/>

      <Text style={{ marginBottom: 10 }}>
        Échéance : {invoice.dueDate}
      </Text>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Total : {(invoice.total / 100).toFixed(2)} {invoice.currency}
      </Text>

      <Text style={{ fontWeight: "bold", marginTop: 20 }}>
        Items :
      </Text>

      <FlatList
        data={invoice.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 8 }}>
            <Text>
              {item.description} — {item.quantity} × {(item.unitPrice / 100).toFixed(2)}
            </Text>
          </View>
        )}
      />
      <PrimaryButton
        title={
          invoice.status === "paid"
          ? "Marquer comme non payé"
          : "Maequer comme payé"
        }
        onPress={handleToggleStatus}
      />
      <PrimaryButton
        title="Modifier la facture"
        onPress={() => router.push(`/invoice/edit/${invoice.id}`)}
      />
      <PrimaryButton
        title="Supprimer la facture"
        onPress={handleDelete}
      />
    </View>
  );
}