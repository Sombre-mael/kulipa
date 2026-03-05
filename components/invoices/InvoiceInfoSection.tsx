import { View, Text } from "react-native";

export default function InvoiceInfoSection() {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: "bold" }}>Infos facture</Text>
      <Text style={{ marginTop: 6, color: "#6B7280" }}>
        Les champs date et echeance seront ajoutes ici.
      </Text>
    </View>
  );
}
