import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps;

export function Input({...rest}: Props) {
    return (
        <TextInput
            className="text-zinc-900 font-poppins w-full bg-amber-50 px-2 py-4 rounded-xl shadow-lg"
            {...rest}
        />
    )
}