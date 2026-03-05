import { TouchableOpacity, Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}