import { Note as NoteType } from "@/types/note";
import Entypo from "@expo/vector-icons/Entypo";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { SectionedNotes } from "../utils/group-notes-by-date";
import { Note } from "./Note";
import { UpdateNoteModal } from "./UpdateNoteModal copy";

type Props = {
    sections: SectionedNotes[]
}

export function Notes({sections}: Props) {
    const { colorScheme } = useColorScheme();

    const [noteToUpdate, setNoteToUpdate] = useState<NoteType | null>(null);
    const [isUpdateNoteModalVisible, setIsUpdateNoteModalVisible] = useState(false);

    function openUpdateNoteModal(note: NoteType) {
        setNoteToUpdate(note);
        setIsUpdateNoteModalVisible(true);
    }

    function closeUpdateNoteModal() {
        setNoteToUpdate(null);
        setIsUpdateNoteModalVisible(false);
    }

    return (
         <View className='h-[70%] overflow-hidden scroll-smooth'>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}

                renderSectionHeader={({ section: { title } }) => (
                    <View className="">
                        <Text className="text-xl font-lemon text-purple-700 dark:text-purple-500 mt-4">{title}</Text>
                    </View>
                )}

                renderItem={({ item }) => <Note item={item} openUpdateNoteModal={openUpdateNoteModal} /> }

                ListEmptyComponent={() => (
                    <View className='gap-2 items-center mt-44 h-full'>
                        <Text className='font-poppins text-center text-slate-800 dark:text-zinc-50'>Não há nenhuma nota no diário ainda.</Text>
                        <Text className='font-poppins-bold text-lg text-center text-slate-800 dark:text-zinc-50'>Tente começar escrevendo algo!</Text>
                        <TouchableOpacity className='flex-row items-center underline mt-8'>
                            <Entypo className='text-center' name='pencil' size={32} color={colorScheme === "light" ? colors.slate[800] : colors.zinc[50]} />
                            <Text className='font-poppins-bold text-xl text-center text-slate-800 dark:text-zinc-50'>ESCREVER</Text>
                        </TouchableOpacity>
                    </View>
                )}

                scrollEnabled
                className='flex-1'
            />

            {!!noteToUpdate && 
                <UpdateNoteModal
                    note={noteToUpdate}
                    visible={isUpdateNoteModalVisible}
                    onClose={closeUpdateNoteModal}
                />
            }
            
        </View>
    )
}