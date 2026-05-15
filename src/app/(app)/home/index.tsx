import { Header } from '@/components/Header';
import { IconButton } from '@/components/IconButton';
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Notes } from './components/Notes';
import { groupNotesByDate, SectionedNotes } from "./utils/group-notes-by-date";

export default function Home() {
    const [sections, setSections] = useState<SectionedNotes[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const apiResponse = {
                    notes: [
                        {
                            id: "1",
                            title: "Ideia de App",
                            description: "Fazer um app usando Expo e NestJS.",
                            createdAt: "2026-05-15T12:40:24.226Z",
                            updatedAt: "2026-05-15T12:40:24.226Z"
                        },
                        {
                            id: "2",
                            title: "Reunião de alinhamento",
                            description: "Definir o banco de dados.",
                            createdAt: "2026-05-15T09:15:00.000Z",
                            updatedAt: "2026-05-15T09:15:00.000Z"
                        },
                        {
                            id: "5",
                            title: "Ideia de App",
                            description: "Fazer um app usando Expo e NestJS.",
                            createdAt: "2026-05-15T12:40:24.226Z",
                            updatedAt: "2026-05-15T12:40:24.226Z"
                        },
                        {
                            id: "7",
                            title: "Ideia de App",
                            description: "Fazer um app usando Expo e NestJS.",
                            createdAt: "2026-05-15T12:40:24.226Z",
                            updatedAt: "2026-05-15T12:40:24.226Z"
                        },
                        {
                            id: "8",
                            title: "Ideia de App",
                            description: "Fazer um app usando Expo e NestJS.",
                            createdAt: "2026-05-15T12:40:24.226Z",
                            updatedAt: "2026-05-15T12:40:24.226Z"
                        },
                        {
                            id: "6",
                            title: "Reunião de alinhamento",
                            description: "Definir o banco de dados.",
                            createdAt: "2026-05-15T09:15:00.000Z",
                            updatedAt: "2026-05-15T09:15:00.000Z"
                        },
                        {
                            id: "3",
                            title: "Mercado",
                            description: "Comprar café e pão de queijo.",
                            createdAt: "2026-05-14T18:30:00.000Z",
                            updatedAt: "2026-05-14T18:30:00.000Z"
                        },
                        {
                            id: "4",
                            title: "Mercado",
                            description: "Comprar café e pão de queijo.",
                            createdAt: "2026-05-14T18:30:00.000Z",
                            updatedAt: "2026-05-14T18:30:00.000Z"
                        },
                    ]
                }

                const sectionedNotes = groupNotesByDate(apiResponse.notes);
                setSections(sectionedNotes);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);

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