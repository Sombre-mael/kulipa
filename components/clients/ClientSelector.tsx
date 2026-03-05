import { View, Text, TouchableOpacity } from "react-native";
import { useClientStore } from "@/store/useClientStore";

interface Props {
  selectedClientId: string | null;
  onSelect: (clientId: string) => void;
}

export default function ClientSelector({
  selectedClientId,
  onSelect,
}: Props) {
  const { clients } = useClientStore();

  return (
    <View style={{ marginTop: 20 }}>

      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Sélectionner un client
      </Text>

      {clients.map((client) => (

        <TouchableOpacity
          key={client.id}
          onPress={() => onSelect(client.id)}
          style={{
            padding: 10,
            borderRadius: 6,
            marginBottom: 8,
            backgroundColor:
              selectedClientId === client.id ? "#007AFF" : "#eee",
          }}
        >

          <Text
            style={{
              color:
                selectedClientId === client.id ? "white" : "black",
            }}
          >
            {client.name}
          </Text>

        </TouchableOpacity>

      ))}

    </View>
  );
}