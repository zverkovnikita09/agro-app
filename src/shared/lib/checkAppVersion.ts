import { Platform } from 'react-native';
import * as Device from 'expo-device';

export const checkAppVersion = async () => {
    try {
        if (Platform.OS === 'web' || !Device.isDevice) {
            return null;
        }

        // 👇 Динамический импорт библиотеки — не загрузится на web
        // @ts-ignore
        const VersionCheck = (await import('react-native-version-check-expo')).default;

        const currentVersion = VersionCheck.getCurrentVersion();

        const options =
            Platform.OS === 'ios'
                ? {
                    provider: 'appStore',
                    appID: '6743162740', // <- ID из App Store URL
                }
                : {
                    provider: 'playStore',
                    packageName: 'com.anonymous.Agro', // <- Package из Google Play URL
                };

        const latestVersion = await VersionCheck.getLatestVersion(options);

        const update = await VersionCheck.needUpdate({
            currentVersion,
            latestVersion,
        });

        return {
            currentVersion,
            latestVersion,
            needsUpdate: update.isNeeded,
            storeUrl: update.isNeeded
                ? await VersionCheck.getStoreUrl(options)
                : null,
        };
    } catch (error) {
        console.error('Ошибка при проверке версии:', error);
    }
};
