import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useClientStore } from "@/store/useClientStore";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function ClientDetailsScreen() {

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { clients, deleteClient } = useClientStore();
  const client = clients.find((c) => c.id === String(id));
  const { invoices } = useInvoiceStore();

  if (!client) return null;
  const clientInvoices = invoices.filter(
    (inv) => inv.clientId === client.id
  );


  const handleDelete = () => {
    deleteClient(client.id);
    router.replace("/(tabs)/clients");
  };

  return (
    <View style={{ padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {client.name}
      </Text>

      <Text>Email : {client.email}</Text>

      {client.phone && <Text>Téléphone : {client.phone}</Text>}

      {client.address && <Text>Adresse : {client.address}</Text>}

      <Text>Devise : {client.currency}</Text>

      <Text>
        Statut : {client.isActive ? "Actif" : "Inactif"}
      </Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Factures du client
      </Text>
      {clientInvoices.length === 0 ? (
        <Text>Aucune facture</Text>
      ) : (
        clientInvoices.map((invoice) => (
          <View
            key={invoice.id}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: "#f5f5f5",
              borderRadius: 6,
            }}
          >
            <Text>
              Total : {(invoice.total / 100).toFixed(2)} {invoice.currency}
            </Text>
            <Text>
              Statut : {invoice.status}
            </Text>
          </View>
        ))
      )}

      <PrimaryButton
        title="Modifier"
        onPress={() => router.push(`/client/edit/${client.id}`)}
      />

      <PrimaryButton
        title="Supprimer"
        onPress={handleDelete}
      />

    </View>
  );
}