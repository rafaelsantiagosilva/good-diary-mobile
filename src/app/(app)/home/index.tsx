import { Header } from '@/components/Header';
import { IconButton } from '@/components/IconButton';
import { useFetchUserNotesContollerHandle } from '@/services/api/generated/note/note';
import { Note } from '@/types/note';
import { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AddNoteModal } from './components/AddNoteModal';
import { Notes } from './components/Notes';
import { groupNotesByDate } from "./utils/group-notes-by-date";

export default function Home() {
    const { isLoading, data } = useFetchUserNotesContollerHandle();

    const notes: Note[] = (data as any)?.notes || [];

    const sections = useMemo(() => {
        return groupNotesByDate(notes);
    }, [notes]);

    const [isAddNoteModalVisible, setIsAddNoteModalVisible] = useState(false);

    return (
        <View className="bg-amber-50 dark:bg-slate-800 h-full">
            <Header icon='user' title='Diário' address={"/profile"} />

            <View className="h-full py-4 pb-8 px-8">
                {isLoading && <ActivityIndicator className="text-purple-700 top-72" size={"large"} />}
                {!isLoading && <Notes sections={sections} /> }

                <View className='justify-center items-center w-full mt-8'>
                    <IconButton icon="plus" onPress={() => setIsAddNoteModalVisible(true)} />
                </View>
            </View>

            <AddNoteModal
                visible={isAddNoteModalVisible}
                onClose={() => setIsAddNoteModalVisible(false)}
            />
        </View>
    )
}