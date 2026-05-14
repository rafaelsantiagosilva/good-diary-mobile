import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import "../../global.css";

import { Lemon_400Regular } from "@expo-google-fonts/lemon";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import { useEffect } from "react";

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
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-lemon text-blue-500">
        Good Diary
      </Text>
    </View>
  );
}