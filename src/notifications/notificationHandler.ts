import { Platform } from 'react-native';

import * as Notifications from 'expo-notifications';

export function setupNotificationHandler() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });


    // Настраиваем канал уведомлений на Android
    (async () => {
        if (Platform.OS === 'android') {
            try {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Основные уведомления',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            } catch (error) {
                console.warn('Ошибка создания канала уведомлений', error);
            }
        }
    })()
}
