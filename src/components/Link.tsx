import { Link as ExpoLink, Href } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

type Props =  {
    address: Href;
    label: string;
}

export function Link({ address, label }: Props) {
    return (
        <ExpoLink href={address} asChild>
            <TouchableOpacity activeOpacity={0.7}>
            <Text className="font-poppins-bold text-center text-slate-50 underline">{label}</Text>
            </TouchableOpacity>
        </ExpoLink>
    )
}