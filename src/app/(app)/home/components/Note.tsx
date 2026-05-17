import { Note as NoteType } from "@/types/note";
import Entypo from "@expo/vector-icons/Entypo";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

type Props = {
    item: NoteType
    openUpdateNoteModal: (note: NoteType) => void
}

export function Note({ item, openUpdateNoteModal }: Props) {
    const { colorScheme } = useColorScheme();

    return (
        <View className="rounded-xl shadow-lg mt-4 bg-purple-50 dark:bg-slate-700 p-4">
            <View className="flex-row justify-between">
                <Text className="font-poppins-bold dark:text-zinc-50">{item.title}</Text>
                <View className='flex-row gap-3'>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => openUpdateNoteModal(item) }>
                        <Entypo name="pencil" size={24} color={colors.purple[colorScheme === "light" ? 700 : 500]} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7}>
                        <Entypo name="trash" size={24} color={colors.purple[colorScheme === "light" ? 700 : 500]} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text className='text-slate-600 dark:text-zinc-200 font-poppins'>{item.description}</Text>
        </View>
    )
}