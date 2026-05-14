import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Text, View } from "react-native";


export default function Login() {
    return (
        <View className="flex-1 items-center bg-purple-700 pt-16">
      <Text className="text-5xl font-lemon text-slate-50">
        Good Diary
      </Text>

      <View className="w-full px-16 mt-32 gap-8">
        <Input placeholder="E-mail" keyboardType="email-address" />
        <Input placeholder="Senha" secureTextEntry />
        <Button label="Entrar" />

        <Link address={"/login"} label="Não possui uma conta? Criar" />
      </View>
    </View>
    )
}