import { Platform } from 'react-native';

import * as Notifications from 'expo-notifications';

export function setupNotificationHandler() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
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


    // Слушатель входящих уведомлений
    const notificationSubscription = Notifications.addNotificationReceivedListener(notification => {
        console.log("📩 Уведомление получено:", notification);
    });

    // Слушатель нажатий по уведомлению
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
        console.log("👆 Нажали на уведомление:", response);
    });

    return () => {
        notificationSubscription.remove()
        responseSubscription.remove()
    };
}
