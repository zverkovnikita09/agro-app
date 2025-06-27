import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    storeUrl: string;
};

export const UpdateModal = ({ isVisible, onClose, storeUrl }: Props) => {
    return (
        <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
            <View style={styles.container}>
                <Text style={styles.title}>Доступно обновление</Text>
                <Text style={styles.text}>Пожалуйста, обновите приложение до последней версии.</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.cancel} onPress={onClose}>
                        <Text style={styles.cancelText}>Позже</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.update} onPress={() => Linking.openURL(storeUrl)}>
                        <Text style={styles.updateText}>Обновить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 8
    },
    text: {
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 12,
        color: '#B6B6B6'
    },
    buttons: { flexDirection: 'row', gap: 10 },
    cancel: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        width: 100,
        borderWidth: 1
    },
    update: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: '#F2B430',
        borderRadius: 12,
        width: 100
    },
    cancelText: {
        color: '#000',
        fontSize: 12,
        textAlign: 'center'
    },
    updateText: {
        color: '#000',
        fontSize: 12,
        textAlign: 'center'
    },
});
