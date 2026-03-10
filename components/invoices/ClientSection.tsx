import { Text } from "react-native";
import AppCard from "@/components/ui/AppCard";
import AppInput from "@/components/ui/AppInput";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  clientId: string | null;
  setClientId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ClientSection({ clientId, setClientId }: Props) {
  const { colors } = useAppTheme();
  return (
    <AppCard style={{ marginTop: 12, backgroundColor: colors.glassStrong }}>
      <Text style={{ color: colors.text, fontWeight: "800" }}>Client</Text>
      <AppInput placeholder="ID client" value={clientId ?? ""} onChangeText={(value) => setClientId(value || null)} />
    </AppCard>
  );
}
