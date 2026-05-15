import Entypo from "@expo/vector-icons/Entypo";
import { Link as ExpoLink, Href } from "expo-router";
import { ComponentProps } from "react";
import { Text, View } from "react-native";
import { IconButton } from "./IconButton";

type Props = {
    icon: ComponentProps<typeof Entypo>["name"];
    address: Href;
    title: string;
}

export function Header({title, icon, address}: Props) {
    return (
        <View className="flex-row items-center justify-between h-40 bg-purple-700 rounded-b-3xl shadow-xl pt-12 px-6">
                <Text className="font-lemon text-5xl text-slate-50">{title}</Text>

                <ExpoLink href={address} asChild>
                    <IconButton icon={icon} />
                </ExpoLink>
        </View>
    )
}