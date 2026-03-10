import { StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useClientStore } from "@/store/useClientStore";
import AppScreen from "@/components/ui/AppScreen";
import AppCard from "@/components/ui/AppCard";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { useAppTheme } from "@/providers/AppThemeProvider";
import { Spacing } from "@/constants/design";

export default function CreateClientScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
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
    <AppScreen>
      <Text style={[styles.title, { color: colors.text }]}>Nouveau client</Text>
      <AppCard style={{ marginTop: Spacing.sm, backgroundColor: colors.glassStrong }}>
        <AppInput placeholder="Nom du client" value={name} onChangeText={setName} />
        <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
        <AppInput placeholder="Telephone" value={phone} onChangeText={setPhone} />
        <AppInput placeholder="Adresse" value={address} onChangeText={setAddress} />
        <AppInput placeholder="Devise (USD, EUR, CDF)" value={currency} onChangeText={setCurrency} />
        <AppButton title="Enregistrer client" onPress={handleSave} style={{ marginTop: 14 }} />
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: "900" },
});
