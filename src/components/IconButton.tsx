import Entypo from "@expo/vector-icons/Entypo";
import { ComponentProps } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

type Props = TouchableOpacityProps & {
    icon: ComponentProps<typeof Entypo>["name"];
}

export function IconButton({icon, ...rest}: Props) {
    return (
        <TouchableOpacity className='size-16 bg-purple-700 rounded-full shadow-xl text-center items-center justify-center border-4 border-purple-600' {...rest}>
            <Entypo name={icon} size={28} color={colors.slate[50]} />
        </TouchableOpacity>
    )
}