import { Note as NoteType } from "@/types/note";
import Entypo from "@expo/vector-icons/Entypo";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

type Props = {
    item: NoteType
}

export function Note({ item }: Props) {
    return (
        <View className="rounded-xl shadow-lg mt-4 bg-purple-50 p-4">
            <View className="flex-row justify-between">
                <Text className="font-poppins-bold">{item.title}</Text>
                <View className='flex-row gap-3'>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Entypo name="pencil" size={24} color={colors.purple[700]} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7}>
                        <Entypo name="trash" size={24} color={colors.purple[700]} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text className='text-slate-500 font-poppins'>{item.description}</Text>
        </View>
    )
}