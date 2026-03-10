import { Text } from "react-native";
import AppCard from "@/components/ui/AppCard";
import AppInput from "@/components/ui/AppInput";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  taxRate: number;
  setTaxRate: React.Dispatch<React.SetStateAction<number>>;
}

export default function TaxSection({ taxRate, setTaxRate }: Props) {
  const { colors } = useAppTheme();
  return (
    <AppCard style={{ marginTop: 12, backgroundColor: colors.glassStrong }}>
      <Text style={{ color: colors.text, fontWeight: "800", marginBottom: 4 }}>Taxe</Text>
      <AppInput
        placeholder="Taux (ex: 0.16)"
        keyboardType="numeric"
        value={String(taxRate)}
        onChangeText={(value) => setTaxRate(Number(value) || 0)}
      />
    </AppCard>
  );
}
