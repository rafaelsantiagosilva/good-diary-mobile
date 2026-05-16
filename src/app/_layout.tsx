import * as SplashScreen from "expo-splash-screen";
import "../../global.css";

import { tokenStore } from "@/services/api/token-store";
import { Lemon_400Regular } from "@expo-google-fonts/lemon";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  const rootNavigationState = useRootNavigationState();

  const isAuthenticated = !!tokenStore.getToken();

  const [fontsLoaded, fontError] = useFonts({
    Lemon_400Regular,
    Poppins_400Regular,
    Poppins_700Bold
  });

  useEffect(() => {
    if (fontsLoaded || fontError)
      SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!fontsLoaded) return;
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)" || segments[0] === "login" || segments[0] === "create-account";

    if (!isAuthenticated && !inAuthGroup)
      router.replace("/login");
    else if (isAuthenticated && inAuthGroup)
      router.replace("/home");
  }, [isAuthenticated, segments]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>  
  );
}