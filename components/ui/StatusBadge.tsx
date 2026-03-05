import { View, Text } from "react-native";
import { InvoiceStatus } from "@/types/invoice";
import { Background } from "@react-navigation/elements";

interface Props {
  status: InvoiceStatus;
}

function getStatusStyle(status: InvoiceStatus) {
  switch (status) {
    case "paid":
      return { backgroundColor: "#d4edda", color: "#155724"};

    case "draft":
      return { backgroundColor: "#fff3cd", color: "#856404"};

    case "overdue":
      return { backgroundColor: "#f8d7da", color: "#721c24"};

    case "sent":
      return { backgroundColor: "#e2e3e5", color: "#383d41"};
  }
}

export default function StatusBadge({status}: Props) {
  const style = getStatusStyle(status);

  return (
    <View 
      style={{
        paddingHorizontal:10,
        paddingVertical:4,
        borderRadius: 6,
        backgroundColor: style.backgroundColor,
      }}
    >
      <Text
        style={{
          fontSize:12,
          fontWeight: "bold",
          color: style.color,
        }}
      >
        {status.toUpperCase()}
      </Text>
    </View>
  );
}