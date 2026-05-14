import { Link as ExpoLink, Href } from "expo-router";
import { Text } from "react-native";

type Props =  {
    address: Href;
    label: string;
}

export function Link({ address }: Props) {
    return (
        <ExpoLink href={address} asChild>
          <Text className="font-poppins-bold text-center text-slate-50 underline">Não possui uma conta? Criar</Text>
        </ExpoLink>
    )
}