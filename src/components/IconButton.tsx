import Entypo from "@expo/vector-icons/Entypo";
import { ComponentProps } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

type IconButtonVariant = "md" | "sm";

type Props = TouchableOpacityProps & {
    icon: ComponentProps<typeof Entypo>["name"];
    variant?: IconButtonVariant;
}

export function IconButton({
        icon, 
        variant="md", 
        ...rest
    }: Props) {

    const containerVariants: Record<IconButtonVariant, string> = {
        md: "size-16",
        sm: "size-12"
    }

    const iconVariants: Record<IconButtonVariant, number> = {
        md: 28,
        sm: 18
    }

    return (
        <TouchableOpacity className={`${containerVariants[variant]} bg-purple-700 rounded-full shadow-xl text-center items-center justify-center border-4 border-purple-600`} {...rest}>
            <Entypo name={icon} size={iconVariants[variant]} color={colors.slate[50]} />
        </TouchableOpacity>
    )
}