import { View, TouchableOpacity, Text } from "react-native";
import { InvoiceStatus } from "@/types/invoice";

type Filter = "all" | InvoiceStatus;

interface Props {
  selected: Filter;
  onChange: (filter: Filter) => void;
}

export default function InvoiceFilter({ selected, onChange }: Props) {
  const filters: Filter[] = ["all", "paid", "draft", "overdue"];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
      }}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => onChange(filter)}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 6,
            backgroundColor: selected === filter ? "#007AFF" : "#eee",
          }}
        >
          <Text
            style={{
              color: selected === filter ? "white" : "#333",
              fontWeight: "bold",
            }}
          >
            {filter.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}