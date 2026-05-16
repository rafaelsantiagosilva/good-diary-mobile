import { Header } from "@/components/Header";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { tokenStore } from "@/services/api/token-store";
import { UserPayload } from "@/types/user-payload";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Profile() {
    const [user, setUser] = useState<UserPayload | null>(null);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        async function loadUser() {
            const userData = await tokenStore.getUser();
            setUser(userData);
        }

        loadUser();
    }), [];

    return (
        <View className="bg-amber-50 h-full">
            <Header icon='book' title='Perfil' address={"/home"} />

            <View className="h-full p-8 gap-6">
                <View className="gap-2">
                    <Text className="font-lemon text-purple-700 text-lg">Nome</Text>
                    <Input value={user?.name} editable={false} />
                </View>
                
                <View className="gap-2">
                    <Text className="font-lemon text-purple-700 text-lg">E-mail</Text>
                    <Input value={user?.email} editable={false} />
                </View>

                <View className="gap-2">
                    <Text className="font-lemon text-purple-700 text-lg">Tema</Text>

                    <View className="flex-row justify-between">
                        <View className="w-60">
                         <Input value={theme === "light" ? "Claro" : "Escuro"} editable={false} />
                        </View>
                        <IconButton onPress={() => setTheme(
                            theme === "light" ? "dark" : "light"
                        )} variant="sm" icon={theme === "light" ? "light-up" : "moon"} />
                    </View>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text className="font-lemon text-purple-700 text-lg">Sair</Text>
                    <IconButton variant="sm" icon="log-out" onPress={() => {
                        tokenStore.clearToken();
                        router.replace("/login");
                    }} />
                </View>
            </View>
        </View>
        
    )
}