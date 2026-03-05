import { View, Text, TouchableOpacity } from "react-native";
import { Invoice } from "@/types/invoice";
import StatusBadge from "../ui/StatusBadge";
import { useClientStore } from "@/store/useClientStore";
import { formatDate } from "@/utils/formatDate";

interface Props {
  invoice: Invoice;
  onPress: () => void;
}

function getStatusColor(status: string) {
  switch (status) {
    case "paid":
      return "green";
    case "overdue":
      return "red";
    case "draft":
      return "orange";
    default:
      return "gray";
  }
}

export default function InvoiceCard({ invoice, onPress }: Props) {
  const { clients } = useClientStore();
  const client = clients.find(
    (client) => client.id === invoice.clientId
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#f5f5f5",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {client ? client.name : "Client inconnu"}
        </Text>
        <StatusBadge status={invoice.status}/>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {(invoice.total / 100).toFixed(2)} {invoice.currency}
      </Text>

      <Text style={{ color: "#666", marginTop: 4 }}>
        Date: {formatDate(invoice.dueDate)}
      </Text>
    </TouchableOpacity>
  );
}