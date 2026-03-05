import { View, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { useClientStore } from "@/store/useClientStore";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function CreateClientScreen() {

  const router = useRouter();
  const { addClient } = useClientStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSave = () => {

    if (!name || !email) return;

    addClient({
      id: Date.now().toString(),
      name,
      email,
      phone,
      address,
      currency,
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    router.replace("/(tabs)/clients");
  };

  return (
    <View style={{ padding: 20 }}>

      <TextInput
        placeholder="Nom du client"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Téléphone"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="Devise (USD, EUR, CDF)"
        value={currency}
        onChangeText={setCurrency}
      />

      <PrimaryButton
        title="Enregistrer client"
        onPress={handleSave}
      />

    </View>
  );
}