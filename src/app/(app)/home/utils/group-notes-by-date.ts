import { Note } from "@/types/note";

export type SectionedNotes = {
    title: string;
    data: Note[];
}

export function groupNotesByDate(notes: Note[]) {
    const groups = notes.reduce((acc, note) => {
        const dateObj = new Date(note.createdAt);
        const dateKey = dateObj.toLocaleDateString("pt-BR");

        if (!acc[dateKey])
            acc[dateKey] = [];

        acc[dateKey].push(note);

        return acc
    }, {} as Record<string, Note[]>);

    const sectionedArray = Object.keys(groups).map((date) => ({
        title: date,
        data: groups[date]
    }));

    return sectionedArray.sort((a, b) => {
        // Formato americano para comparação
        const dateA = a.title.split("/").reverse().join("-");
        const dateB = b.title.split("/").reverse().join("-");

        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
}