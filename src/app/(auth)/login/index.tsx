import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { useAuthControllerHandle } from "@/services/api/generated/auth/auth";
import { LoginResponseDto } from "@/services/api/generated/model";
import { tokenStore } from "@/services/api/token-store";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, mutateAsync } = useAuthControllerHandle();
  
  async function handleLogin(payload: { email: string, password: string }) {
    try {
      const response = (await mutateAsync({
        data: payload
      })) as unknown as LoginResponseDto;

      tokenStore.setToken(response.token);
      console.log(response.token);
      router.replace("/home");
      return;
  } catch (err: any) {
    Alert.alert("Ocorreu um erro", "algm me mata", [
      { text: "Ok" }
    ]);
  }
  }

    return (
    <View className="flex-1 items-center bg-purple-700 pt-16">
      <Text className="text-5xl font-lemon text-slate-50">
        Good Diary
      </Text>

      <View className="w-full px-16 mt-32 gap-8">
        <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none"  value={email} onChangeText={(text) => setEmail(text)} />
        <Input placeholder="Senha" secureTextEntry autoCapitalize="none" value={password} onChangeText={(text) => setPassword(text)} />
        <Button onPress={async () => {
          handleLogin({
            email, password
          });
        }} isLoading={isPending} className="mt-12" label="Entrar" />

        <Link address={"/create-account"} label="Não possui uma conta? Criar" />
      </View>
    </View>
    )
}