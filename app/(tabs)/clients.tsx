import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { useClientStore } from "@/store/useClientStore";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function ClientsScreen() {

  const router = useRouter();
  const { clients } = useClientStore();

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Clients
      </Text>

      <PrimaryButton
        title="Ajouter un client"
        onPress={() => router.push("/client/create")}
      />

      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/client/${item.id}`)}
              style={{
                marginTop: 15,
                padding: 12,
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
              }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.name}
            </Text>
            <Text>{item.email}</Text>
              {item.phone && <Text>{item.phone}</Text>}
            <Text>Devise : {item.currency}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}