import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function registerPushNotificationsAsync() {
    if (!Device.isDevice || (Platform.OS !== 'ios' && Platform.OS !== 'android')) {
        Alert.alert('Пуши работают только на физических телефонах iOS и Android');
        return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;


    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Разрешение на уведомления не получено!');
        return null;
    }


    const { data } = await Notifications.getExpoPushTokenAsync();
    return typeof data === 'string' ? data : null;
}
