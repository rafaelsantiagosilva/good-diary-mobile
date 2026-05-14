import * as SplashScreen from "expo-splash-screen";
import "../../global.css";

import { Lemon_400Regular } from "@expo-google-fonts/lemon";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { Slot, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  const rootNavigationState = useRootNavigationState();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    if (!rootNavigationState.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup)
      router.replace("/login");
    else if (isAuthenticated && inAuthGroup)
      router.replace("/login");
  }, [isAuthenticated, segments]);

  return <Slot />;
}