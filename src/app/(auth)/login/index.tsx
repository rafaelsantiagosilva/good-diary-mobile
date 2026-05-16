import { BaseModal } from "@/components/BaseModal";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { useAuthControllerHandle } from "@/services/api/generated/auth/auth";
import { LoginResponseDto } from "@/services/api/generated/model";
import { tokenStore } from "@/services/api/token-store";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isPending, mutateAsync } = useAuthControllerHandle();
  
  async function handleLogin(payload: { email: string, password: string }) {
    try {
      const response = (await mutateAsync({
        data: payload
      })) as unknown as LoginResponseDto;

      await tokenStore.setToken(response.token);
      router.replace("/home");
  } catch (err: any | AxiosError) {    
    setErrorMessage("Credenciais inválidas.");

    if (err instanceof AxiosError && err.status! >= 500)
      setErrorMessage("Um erro desconhecido ocorreu. Tente novamente mais tarde.");
  
    setIsErrorModalVisible(true);
  }
  }

    return (
    <View className="flex-1 items-center bg-purple-700 pt-16">
      <Text className="text-5xl font-lemon text-slate-50 pb-2">
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

      <BaseModal
        visible={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        title="Ocorreu um erro"
      >
        <Text className="font-poppins dark:text-slate-50">{errorMessage}</Text>

      </BaseModal>
    </View>
    )
}