import { SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import "./globals.css";
import useAuthStore from "@/stores/auth.store";

export default function RootLayout() {
  const { isLoading, fetchAuthenticatedUser, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  if (!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
