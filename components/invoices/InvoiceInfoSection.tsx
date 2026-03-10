import { Text } from "react-native";
import AppCard from "@/components/ui/AppCard";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function InvoiceInfoSection() {
  const { colors } = useAppTheme();
  return (
    <AppCard style={{ marginTop: 12, backgroundColor: colors.glassStrong }}>
      <Text style={{ color: colors.text, fontWeight: "800" }}>Infos facture</Text>
      <Text style={{ marginTop: 6, color: colors.textMuted }}>
        Les champs date et echeance seront ajoutes ici.
      </Text>
    </AppCard>
  );
}
