import { View, Text } from "react-native";

interface Props {
  title: string;
  value: string;
}

export default function KpiCard({ title, value }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#f2f2f2",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
      }}
    >
      <Text style={{ fontSize: 14, color: "#666" }}>{title}</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>
        {value}
      </Text>
    </View>
  );
}