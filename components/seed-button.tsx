import React, { useState } from "react";
import { Button, ActivityIndicator, View, Text } from "react-native";
import seed from "@/libs/seed";

const SeedButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    setError(null);
    try {
      await seed();
    } catch (e: any) {
      setError(e.message);
      console.error(e);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <View>
      <Button title="Seed Database" onPress={handleSeed} disabled={isSeeding} />
      {isSeeding && <ActivityIndicator />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

export default SeedButton;
