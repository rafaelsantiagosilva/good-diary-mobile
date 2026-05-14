import * as SplashScreen from "expo-splash-screen";
import "../../global.css";

import { Lemon_400Regular } from "@expo-google-fonts/lemon";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import Login from "./(auth)/login";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Lemon_400Regular,
    Poppins_400Regular,
    Poppins_700Bold
  });

  useEffect(() => {
    if (fontsLoaded || fontError)
      SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  return (
    <Login />
  );
}