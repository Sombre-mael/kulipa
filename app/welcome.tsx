import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#111827" }}>
        Bienvenue sur Kulipa
      </Text>

      <Text style={{ textAlign: "center", marginBottom: 30, color: "#374151" }}>
        Simplifiez votre facturation et suivez vos paiements en toute simplicite.
      </Text>

      <Button title="Commencer" onPress={() => router.replace("/(tabs)/dashboard")} />
    </View>
  );
}
