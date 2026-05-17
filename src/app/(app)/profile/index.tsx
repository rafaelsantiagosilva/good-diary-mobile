import { Header } from "@/components/Header";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { tokenStore } from "@/services/api/token-store";
import { UserPayload } from "@/types/user-payload";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Profile() {
    const [user, setUser] = useState<UserPayload | null>(null);
    const { colorScheme, toggleColorScheme } = useColorScheme();

    useEffect(() => {
        async function loadUser() {
            const userData = await tokenStore.getUser();
            setUser(userData);
        }

        loadUser();
    }), [];

    return (
        <View className="bg-amber-50 dark:bg-slate-800 h-full">
            <Header icon='book' title='Perfil' address={"/home"} />

            <View className="h-full p-8 gap-6">
                <View className="gap-2">
                    <Text className="font-lemon text-purple-700 dark:text-purple-500 text-lg">Nome</Text>
                    <Input value={user?.name} editable={false} />
                </View>
                
                <View className="gap-2">
                    <Text className="font-lemon text-purple-700 dark:text-purple-500 text-lg">E-mail</Text>
                    <Input value={user?.email} editable={false} />
                </View>

                <View className="gap-2">
                    <Text className="font-lemon text-purple-700 dark:text-purple-500 text-lg">Tema</Text>

                    <View className="flex-row justify-between">
                        <View className="w-60">
                         <Input value={colorScheme === "light" ? "Claro" : "Escuro"} editable={false} />
                        </View>
                        <IconButton 
                            onPress={toggleColorScheme} 
                            variant="sm" 
                            icon={colorScheme === "light" ? "light-up" : "moon"} 
                        />
                    </View>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text className="font-lemon text-purple-700 dark:text-purple-500 text-lg">Sair</Text>
                    <IconButton variant="sm" icon="log-out" onPress={() => {
                        tokenStore.clearToken();
                        router.replace("/login");
                    }} />
                </View>
            </View>
        </View>
        
    )
}