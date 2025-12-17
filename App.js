import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animationEnabled: true,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="quotes" />
                <Stack.Screen name="ayah" />
            </Stack>
            <StatusBar barStyle="dark-content" />
        </>
    );
}
