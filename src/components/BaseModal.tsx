import { ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "./IconButton";

type Props = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode
}

export { Props as BaseModalProps };

export function BaseModal({
    visible,
    onClose,
    title="",
    children
}: Props) {
    return <Modal 
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}
    >
        <TouchableOpacity 
        activeOpacity={1} 
        onPress={onClose}
        className="flex-1 justify-center items-center bg-black/60 px-6"
      >
        {/* Container do Modal. Note as classes 'dark:' para o tema escuro */}
        <TouchableOpacity 
          activeOpacity={1} 
          className="w-full bg-amber-50 dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
        >
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-poppins-bold text-slate-900 dark:text-slate-50 mb-4">
                    {title}
                </Text>
                    <IconButton variant="sm" icon="cross" onPress={onClose} />
            </View>
          
          
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
}