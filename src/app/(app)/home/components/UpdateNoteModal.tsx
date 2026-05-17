import { BaseModal, BaseModalProps } from "@/components/BaseModal";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { getFetchUserNotesContollerHandleQueryKey, useUpdateNoteControllerHandle } from "@/services/api/generated/note/note";
import { Note } from "@/types/note";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { Text, View } from "react-native";

type Props = BaseModalProps & {
    note: Note;
}

export function UpdateNoteModal({ visible, onClose, note }: Props) {
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);

    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useUpdateNoteControllerHandle({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: getFetchUserNotesContollerHandleQueryKey()
                });

                onClose();
                setIsSuccessModalVisible(true);
            }
        }
    });

    async function handleSubmit() {
        try {
            if (title.trim().length === 0) {
                setErrorMessage("O título da nota é obrigatório.");
                setIsErrorModalVisible(true);
                throw new Error();
            }

            await mutateAsync({
                id: note!.id,
                data: {
                    title: title.trim(),
                    description: description.trim(),
                },
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.status! >= 500)
                    setErrorMessage("Ocorreu um erro desconhecido. Tente novamente mais tarde.");
                else if (err.status! === 401)
                    setErrorMessage("Credenciais inválidas.");
                else if (err.status! >= 400)
                    setErrorMessage("Valores inválidos.");
            }
        }
    }

    return (
        <>
            <BaseModal
                visible={visible}
                onClose={onClose}
                title="Atualizar uma nota"
            >
                <View className="gap-2 pt-2">
                    <Input placeholder="Título*" value={title} onChangeText={(text) => setTitle(text)} />
                    <Input 
                        placeholder="Descrição" 
                        numberOfLines={7} 
                        multiline 
                        scrollEnabled 
                        value={description} 
                        onChangeText={(text) => setDescription(text)} 
                    />
                    <Button label="Atualizar" isLoading={isPending} onPress={handleSubmit} />
                </View>

                <BaseModal
                    visible={isErrorModalVisible}
                    onClose={() => setIsErrorModalVisible(false)}
                    title="Ocorreu um erro"
                >
                    <Text className="font-poppins dark:text-slate-50">{errorMessage}</Text>
                </BaseModal>
            </BaseModal>

            <BaseModal
                visible={isSuccessModalVisible}
                onClose={() => setIsSuccessModalVisible(false)}
                title="Sucesso"
            >
                <Text className="font-poppins dark:text-slate-50">A nota foi atualizada com sucesso!</Text>
            </BaseModal>
        </>
    )
}