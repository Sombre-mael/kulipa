import { View, Text, TouchableOpacity } from "react-native";
import { useClientStore } from "@/store/useClientStore";
import AppCard from "@/components/ui/AppCard";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  selectedClientId: string | null;
  onSelect: (clientId: string) => void;
}

export default function ClientSelector({ selectedClientId, onSelect }: Props) {
  const { clients } = useClientStore();
  const { colors } = useAppTheme();

  return (
    <AppCard style={{ marginTop: 12, backgroundColor: colors.glassStrong }}>
      <Text style={{ color: colors.text, fontWeight: "800", marginBottom: 10 }}>Selectionner un client</Text>
      {clients.map((client) => {
        const active = selectedClientId === client.id;
        return (
          <TouchableOpacity
            key={client.id}
            onPress={() => onSelect(client.id)}
            style={{
              padding: 10,
              borderRadius: 10,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: active ? colors.primary : colors.border,
              backgroundColor: active ? colors.primary : colors.glass,
            }}
          >
            <Text style={{ color: active ? "#FFFFFF" : colors.text }}>{client.name}</Text>
          </TouchableOpacity>
        );
      })}
    </AppCard>
  );
}
