import { Text, TouchableOpacity, Image, Platform } from "react-native";
import { MenuItem } from "@/type";
import { useCartStore } from "@/stores/cart.store";
import { useCallback } from "react";

const MenuCard: React.FC<{
  item: MenuItem;
}> = ({ item }) => {
  const { $id, image_url, name, price } = item;
  const { addItem } = useCartStore();

  const handleAddItem = useCallback(() => {
    addItem({
      id: $id,
      name,
      price,
      image_url,
      customizations: [],
    });
  }, [$id, image_url, name, price, addItem]);

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: image_url }}
        style={{ width: 128, height: 128 }}
        className="absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      <TouchableOpacity onPress={handleAddItem}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
