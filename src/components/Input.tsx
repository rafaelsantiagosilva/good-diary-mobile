import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps;

export function Input({className, ...rest}: Props) {
    return (
        <TextInput
            className={`text-zinc-900 dark:text-zinc-50 font-poppins w-full bg-amber-50 dark:bg-slate-800 dark:placeholder:text-zinc-400 px-2 py-4 rounded-xl shadow-lg ${className}`}
            {...rest}
        />
    )
}