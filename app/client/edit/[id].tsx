import { StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useClientStore } from "@/store/useClientStore";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { useAppTheme } from "@/providers/AppThemeProvider";
import { Spacing } from "@/constants/design";

export default function EditClientScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useAppTheme();
  const { clients, updateClient } = useClientStore();
  const client = clients.find((entry) => entry.id === String(id));

  const [name, setName] = useState(client?.name ?? "");
  const [email, setEmail] = useState(client?.email ?? "");
  const [phone, setPhone] = useState(client?.phone ?? "");
  const [address, setAddress] = useState(client?.address ?? "");
  const [currency, setCurrency] = useState(client?.currency ?? "USD");

  if (!client) return null;

  const handleSave = () => {
    updateClient({ ...client, name, email, phone, address, currency });
    router.replace("/(tabs)/clients");
  };

  return (
    <AppScreen>
      <Text style={[styles.title, { color: colors.text }]}>Modifier client</Text>
      <AppCard style={{ marginTop: Spacing.sm, backgroundColor: colors.glassStrong }}>
        <AppInput value={name} onChangeText={setName} placeholder="Nom" />
        <AppInput value={email} onChangeText={setEmail} placeholder="Email" />
        <AppInput value={phone} onChangeText={setPhone} placeholder="Telephone" />
        <AppInput value={address} onChangeText={setAddress} placeholder="Adresse" />
        <AppInput value={currency} onChangeText={setCurrency} placeholder="Devise" />
        <AppButton title="Enregistrer modifications" onPress={handleSave} style={{ marginTop: 14 }} />
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: "900" },
});
