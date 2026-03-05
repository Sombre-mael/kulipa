import { View, TextInput } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useClientStore } from "@/store/useClientStore";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function EditClientScreen() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { clients, updateClient } = useClientStore();

  const client = clients.find((c) => c.id === String(id));

  const [name, setName] = useState(client?.name ?? "");
  const [email, setEmail] = useState(client?.email ?? "");
  const [phone, setPhone] = useState(client?.phone ?? "");
  const [address, setAddress] = useState(client?.address ?? "");
  const [currency, setCurrency] = useState(client?.currency ?? "USD");

  if (!client) return null;

  const handleSave = () => {

    updateClient({
      ...client,
      name,
      email,
      phone,
      address,
      currency,
    });

    router.replace("/(tabs)/clients");
  };

  return (
    <View style={{ padding: 20 }}>

      <TextInput value={name} onChangeText={setName} />

      <TextInput value={email} onChangeText={setEmail} />

      <TextInput value={phone} onChangeText={setPhone} />

      <TextInput value={address} onChangeText={setAddress} />

      <TextInput value={currency} onChangeText={setCurrency} />

      <PrimaryButton
        title="Enregistrer modifications"
        onPress={handleSave}
      />

    </View>
  );
}