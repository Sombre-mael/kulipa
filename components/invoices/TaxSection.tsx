import { View, Text, TextInput } from "react-native";

interface Props {
  taxRate: number;
  setTaxRate: React.Dispatch<React.SetStateAction<number>>;
}

export default function TaxSection({ taxRate, setTaxRate }: Props) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Taxe</Text>
      <TextInput
        placeholder="Taux (ex: 0.16)"
        keyboardType="numeric"
        value={String(taxRate)}
        onChangeText={(value) => setTaxRate(Number(value) || 0)}
      />
    </View>
  );
}
