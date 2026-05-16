import * as SplashScreen from "expo-splash-screen";
import "../../global.css";

import { tokenStore } from "@/services/api/token-store";
import { Lemon_400Regular } from "@expo-google-fonts/lemon";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [fontsLoaded, fontError] = useFonts({
    Lemon_400Regular,
    Poppins_400Regular,
    Poppins_700Bold
  });

  useEffect(() => {
    async function checkAuth() {
      const token = await tokenStore.getToken();
      setIsAuthenticated(!!token);

      if (isAuthenticated)
        return router.replace("/home");
      
      return router.replace("/login");
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError)
      SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (isAuthenticated === null || !fontsLoaded && !fontError) {
    return (
      <View className="flex-1 justify-center items-center bg-purple-700">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>  
  );
}