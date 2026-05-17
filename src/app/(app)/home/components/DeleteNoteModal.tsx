import { BaseModal, BaseModalProps } from "@/components/BaseModal";
import { Button } from "@/components/Button";
import { getFetchUserNotesContollerHandleQueryKey, useDeleteNoteControllerHandle } from "@/services/api/generated/note/note";
import { Note } from "@/types/note";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { Text, View } from "react-native";

type Props = BaseModalProps & {
    note: Note;
}

export function DeleteNoteModal({ visible, onClose, note }: Props) {
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useDeleteNoteControllerHandle({
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
            await mutateAsync({
                id: note!.id,
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
                title="Deletar uma nota"
            >
                <View className="gap-2 pt-2">
                    <Text className="font-poppins dark:text-zinc-50">Você tem certeza que deseja deletar essa nota? Essa ação não pode ser desfeita.</Text>
                    <Button label="Cancelar" isLoading={isPending} onPress={onClose} />
                    <Button label="Sim, desejo deletar" isLoading={isPending} onPress={handleSubmit} />
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
                <Text className="font-poppins dark:text-slate-50">A nota foi deletada com sucesso!</Text>
            </BaseModal>
        </>
    )
}