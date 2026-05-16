import { BaseModal } from "@/components/BaseModal";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { useAuthControllerHandle } from "@/services/api/generated/auth/auth";
import { LoginResponseDto } from "@/services/api/generated/model";
import { useCreateUserControllerHandle } from "@/services/api/generated/user/user";
import { tokenStore } from "@/services/api/token-store";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { z } from "zod";

export default function CreateAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { isPending, mutateAsync } = useCreateUserControllerHandle();
    const { isPending: isPendingAuth, mutateAsync: mutateAsyncAuth } = useAuthControllerHandle();
      
      async function handleCreateAccount() {
        try {
            const { success } = z.email().safeParse(email);

            if (name.length === 0) {
                setErrorMessage("Todos os campos são obrigatórios.");
                setIsErrorModalVisible(true);
                throw new Error();  
            }

            if (!success) {
                setErrorMessage("E-mail inválido.");
                setIsErrorModalVisible(true);
                throw new Error();  
            }

            if (password.length < 6) {
                setErrorMessage("A senha deve ter no mínimo 6 caracteres.");
                setIsErrorModalVisible(true);
                throw new Error();
            }

            if (password !== confirmPassword) {
                setErrorMessage("As senhas devem ser iguais.");
                setIsErrorModalVisible(true);
                throw new Error();
            }

            await mutateAsync({
                data: {
                    name,
                    email,
                    password
                }
            });

            const response = (await mutateAsyncAuth({
                data: {
                    email,
                    password
                }
            })) as unknown as LoginResponseDto;

            await tokenStore.setToken(response.token);
            router.replace("/home");
        } catch (err: any | AxiosError) {            
            if (err instanceof AxiosError) {
                if (err.status! >= 500)
                    setErrorMessage("Ocorreu um erro desconhecido. Tente novamente mais tarde.");
                else if (err.status! >= 400)
                    setErrorMessage("Credenciais inválidas.");
            }
        
            setIsErrorModalVisible(true);
        }
      }

    return (
        <View className="flex-1 items-center bg-purple-700 pt-16">
            <Text className="text-5xl font-lemon text-slate-50 pb-2">
                Good Diary
            </Text>
    
            <View className="w-full px-16 mt-32 gap-8">
            <Input placeholder="Nome" value={name} onChangeText={(text) => setName(text)} />
            <Input placeholder="E-mail" keyboardType="email-address" value={email} autoCapitalize="none" onChangeText={(text) => setEmail(text)}  />
            <Input placeholder="Senha" secureTextEntry value={password} autoCapitalize="none" onChangeText={(text) => setPassword(text)}  />
            <Input placeholder="Confirmar senha" secureTextEntry value={confirmPassword} autoCapitalize="none" onChangeText={(text) => setConfirmPassword(text)}  />
            <Button label="Criar" isLoading={isPending || isPendingAuth} onPress={() => handleCreateAccount()} />
    
            <Link address={"/login"} label="Já possui uma conta? Entrar" />
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