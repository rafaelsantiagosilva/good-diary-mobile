import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    label: string
}

export function Button({className, label, ...rest}: Props) {
    return (
        <TouchableOpacity 
            className={`text-zinc-900 w-full bg-amber-50 px-2 py-4 rounded-xl shadow-lg ${className}`} 
            {...rest}
        >
            <Text className="font-poppins-bold text-center">{label}</Text>
        </TouchableOpacity>
    )
}