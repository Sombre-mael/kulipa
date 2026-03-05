import { View, Text, TextInput } from "react-native";

interface Props {
  clientId: string | null;
  setClientId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ClientSection({ clientId, setClientId }: Props) {
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Client</Text>
      <TextInput
        placeholder="ID client"
        value={clientId ?? ""}
        onChangeText={(value) => setClientId(value || null)}
      />
    </View>
  );
}
