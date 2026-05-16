import { Header } from '@/components/Header';
import { IconButton } from '@/components/IconButton';
import { useFetchUserNotesContollerHandle } from '@/services/api/generated/note/note';
import { Note } from '@/types/note';
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Notes } from './components/Notes';
import { groupNotesByDate, SectionedNotes } from "./utils/group-notes-by-date";

export default function Home() {
    const [sections, setSections] = useState<SectionedNotes[]>([]);
    const [loading, setLoading] = useState(true);

    const { isLoading, data  } = useFetchUserNotesContollerHandle();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                if (!isLoading) {
                    const { notes } = data as any as { notes: Note[]  };
                    const sectionedNotes = groupNotesByDate(notes);
                    setSections(sectionedNotes);
                }     
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, [isLoading]);

    return (
        <View className="bg-amber-50 h-full">
            <Header icon='user' title='Diário' address={"/profile"} />

            <View className="h-full py-4 pb-8 px-8">
                {loading && <ActivityIndicator className="text-purple-700 top-72" size={"large"} />}
                {!loading && <Notes sections={sections} /> }

                <View className='justify-center items-center w-full mt-8'>
                    <IconButton icon="plus" />
                </View>
            </View>
        </View>
    )
}