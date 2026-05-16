import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    label: string
    isLoading?: boolean;
}

export function Button({className, isLoading=false, label, ...rest}: Props) {
    return (
        <TouchableOpacity 
            className={`text-zinc-900 w-full bg-amber-50 px-2 py-4 rounded-xl shadow-lg ${className}`} 
            disabled={isLoading}           
            {...rest}
        >
            <Text className="font-poppins-bold text-center">
                {!isLoading && label}
                {isLoading && <ActivityIndicator className="text-zinc-900"  /> }
            </Text>
        </TouchableOpacity>
    )
}