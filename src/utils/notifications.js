import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDailyAyah } from './getDailyAyah';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    console.log('Notification permission status:', status);
    return status === 'granted';
};

export const sendTestNotification = async () => {
    try {
        const ayah = getDailyAyah();

        // Send immediate notification for testing
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Daily Ayah',
                body: ayah.translation,
                subtitle: `${ayah.surah} - Ayah ${ayah.ayah}`,
                sound: true,
                badge: 1,
                data: {
                    ayah: JSON.stringify(ayah),
                    arabic: ayah.arabic,
                },
            },
            trigger: {
                seconds: 10, // Send in 10 seconds
            },
        });

        console.log('Test notification scheduled for 10 seconds');
    } catch (error) {
        console.error('Error sending test notification:', error);
    }
};

export const scheduleNotifications = async () => {
    try {
        const ayah = getDailyAyah();

        // Cancel all existing notifications
        await Notifications.cancelAllScheduledNotificationsAsync();

        // For Expo Go on iOS: Schedule notifications at specific times
        // Note: Scheduled notifications may not work reliably in Expo Go on iOS
        // For production, you'll need to build a standalone app

        const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

        for (const hour of hours) {
            try {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Daily Ayah',
                        body: ayah.translation,
                        subtitle: `${ayah.surah} - Ayah ${ayah.ayah}`,
                        sound: true,
                        badge: 1,
                        data: {
                            ayah: JSON.stringify(ayah),
                            arabic: ayah.arabic,
                        },
                    },
                    trigger: {
                        hour,
                        minute: 0,
                        repeats: true,
                    },
                });
            } catch (error) {
                console.error(`Error scheduling notification for hour ${hour}:`, error);
            }
        }

        console.log('Daily notifications scheduled');
    } catch (error) {
        console.error('Error scheduling notifications:', error);
    }
};

export const setupNotificationListeners = () => {
    // Handle notification when app is in foreground
    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification received:', notification.request.content.title);
    });

    // Handle notification when user taps it
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Notification tapped:', response.notification.request.content.title);
    });

    return () => {
        foregroundSubscription.remove();
        responseSubscription.remove();
    };
};

export const initializeNotifications = async () => {
    try {
        const hasAskedPermission = await AsyncStorage.getItem('notificationPermissionAsked');

        if (!hasAskedPermission) {
            const granted = await requestNotificationPermission();
            await AsyncStorage.setItem('notificationPermissionAsked', 'true');

            if (granted) {
                await scheduleNotifications();
                // Auto-send test notification to verify it works
                await sendTestNotification();
                console.log('Auto-triggered test notification on first launch');
            }
        } else {
            // Auto-send test notification every time app loads
            await scheduleNotifications();
            await sendTestNotification();
            console.log('Auto-triggered test notification on app load');
        }

        // Setup listeners
        setupNotificationListeners();
    } catch (error) {
        console.error('Error initializing notifications:', error);
    }
};
