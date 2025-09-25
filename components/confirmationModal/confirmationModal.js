import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal
} from "react-native";

export default function ConfirmationModal({
    visible,
    character,
    onConfirm,
    onCancel
}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>⚠️ Remover Personagem</Text>
                    <Text style={styles.modalText}>
                        Tem certeza que deseja remover{" "}
                        <Text style={styles.characterName}>
                            {character?.name}
                        </Text>{" "}
                        da party?
                    </Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmButtonText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#2C1810',
        borderRadius: 12,
        padding: 20,
        margin: 20,
        borderWidth: 2,
        borderColor: '#58180D',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E69A28',
        textAlign: 'center',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        color: '#F4E4BC',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    characterName: {
        fontWeight: 'bold',
        color: '#E69A28',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#4A4A4A',
    },
    confirmButton: {
        backgroundColor: '#D32F2F',
    },
    cancelButtonText: {
        color: '#F4E4BC',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
