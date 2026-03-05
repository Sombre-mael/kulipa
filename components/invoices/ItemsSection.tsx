import { View, Text, TextInput, Button, FlatList } from "react-native";
import { useState } from "react";
import { InvoiceItem } from "@/types/invoice";

interface Props {
  items: InvoiceItem[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

export default function ItemsSection({ items, setItems }: Props) {

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

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string
  ) => {
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
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: "bold" }}>Items</Text>

      {/* Formulaire ajout */}

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Quantité"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        placeholder="Prix unitaire"
        keyboardType="numeric"
        value={unitPrice}
        onChangeText={setUnitPrice}
      />

      <Button title="Ajouter item" onPress={addItem} />

      {/* Liste items */}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>

            <TextInput
              value={item.description}
              onChangeText={(text) =>
                updateItem(item.id, "description", text)
              }
            />

            <TextInput
              value={String(item.quantity)}
              keyboardType="numeric"
              onChangeText={(text) =>
                updateItem(item.id, "quantity", text)
              }
            />

            <TextInput
              value={(item.unitPrice / 100).toString()}
              keyboardType="numeric"
              onChangeText={(text) =>
                updateItem(item.id, "unitPrice", text)
              }
            />

            <Button
              title="Supprimer"
              onPress={() => removeItem(item.id)}
            />

          </View>
        )}
      />
    </View>
  );
}