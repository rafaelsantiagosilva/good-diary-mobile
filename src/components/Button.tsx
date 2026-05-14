import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    label: string
}

export function Button({label, ...rest}: Props) {
    return (
        <TouchableOpacity 
            className="text-zinc-900 w-full mt-12 bg-amber-50 px-2 py-4 rounded-xl shadow-lg" 
            {...rest}
        >
            <Text className="font-poppins-bold text-center">{label}</Text>
        </TouchableOpacity>
    )
}