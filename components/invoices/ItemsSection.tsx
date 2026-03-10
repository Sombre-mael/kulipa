import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import { InvoiceItem } from "@/types/invoice";
import AppCard from "@/components/ui/AppCard";
import AppInput from "@/components/ui/AppInput";
import AppButton from "@/components/ui/AppButton";
import { useAppTheme } from "@/providers/AppThemeProvider";

interface Props {
  items: InvoiceItem[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

export default function ItemsSection({ items, setItems }: Props) {
  const { colors } = useAppTheme();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const addItem = () => {
    if (!quantity || !unitPrice) return;
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description,
      quantity: Number(quantity),
      unitPrice: Math.round(Number(unitPrice) * 100),
    };
    setItems((prev) => [...prev, newItem]);
    setDescription("");
    setQuantity("");
    setUnitPrice("");
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "description"
                  ? value
                  : field === "unitPrice"
                  ? Math.round(Number(value) * 100)
                  : Number(value),
            }
          : item
      )
    );
  };

  return (
    <AppCard style={{ marginTop: 12, backgroundColor: colors.glassStrong }}>
      <Text style={{ color: colors.text, fontWeight: "800" }}>Items</Text>
      <AppInput placeholder="Description" value={description} onChangeText={setDescription} />
      <AppInput placeholder="Quantite" keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
      <AppInput placeholder="Prix unitaire" keyboardType="numeric" value={unitPrice} onChangeText={setUnitPrice} />
      <AppButton title="Ajouter item" onPress={addItem} style={{ marginTop: 10 }} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8, marginTop: 10 }}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.glass }}>
            <AppInput value={item.description} onChangeText={(text) => updateItem(item.id, "description", text)} />
            <AppInput value={String(item.quantity)} keyboardType="numeric" onChangeText={(text) => updateItem(item.id, "quantity", text)} />
            <AppInput value={(item.unitPrice / 100).toString()} keyboardType="numeric" onChangeText={(text) => updateItem(item.id, "unitPrice", text)} />
            <AppButton title="Supprimer" variant="danger" onPress={() => removeItem(item.id)} style={{ marginTop: 10 }} />
          </View>
        )}
      />
    </AppCard>
  );
}
