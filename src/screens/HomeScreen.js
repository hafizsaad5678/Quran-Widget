import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDailyAyah } from '../utils/getDailyAyah';
import { initializeNotifications, sendTestNotification } from '../utils/notifications';

export default function HomeScreen() {
    const router = useRouter();
    const [ayah, setAyah] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = isDarkMode ? darkTheme : lightTheme;

    useEffect(() => {
        const ayahData = getDailyAyah();
        setAyah(ayahData);
        initializeNotifications();
    }, []);

    if (!ayah) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Daily Ayah</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity
                        onPress={async () => {
                            await sendTestNotification();
                            Alert.alert('Test Notification', 'Notification sent! Check in 5 seconds.');
                        }}
                        style={styles.iconButton}
                    >
                        <MaterialCommunityIcons name="bell-outline" size={24} color={theme.accent} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.iconButton}>
                        <MaterialCommunityIcons
                            name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
                            size={24}
                            color={theme.accent}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                {/* Daily Ayah Card */}
                <View style={[styles.ayahCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                    <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Today's Ayah</Text>
                    <Text style={[styles.arabic, { color: theme.text }]}>{ayah.arabic}</Text>
                    <View style={[styles.divider, { backgroundColor: theme.accent }]} />
                    <Text style={[styles.translation, { color: theme.textSecondary }]}>{ayah.translation}</Text>
                    <View style={styles.infoRow}>
                        <Text style={[styles.surah, { color: theme.text }]}>{ayah.surah}</Text>
                        <Text style={[styles.ayahNumber, { color: theme.textSecondary }]}>Ayah {ayah.ayah}</Text>
                    </View>
                </View>

                {/* Navigation Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => router.push('/quotes')}
                        style={[styles.navButton, { backgroundColor: theme.accent }]}
                    >
                        <MaterialCommunityIcons name="format-quote-open" size={24} color="#FFFFFF" />
                        <Text style={styles.navButtonText}>Islamic Quotes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/ayah')}
                        style={[styles.navButton, { backgroundColor: theme.accent }]}
                    >
                        <MaterialCommunityIcons name="book-open-page-variant" size={24} color="#FFFFFF" />
                        <Text style={styles.navButtonText}>Browse Ayat</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { borderTopColor: theme.border }]}>
                <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                    Quran Daily Ayah • Offline
                </Text>
            </View>
        </SafeAreaView>
    );
}

const lightTheme = {
    background: '#FFFFFF',
    cardBackground: '#F8F9FA',
    text: '#1a1a1a',
    textSecondary: '#666666',
    accent: '#D4AF37',
    border: '#E0E0E0',
};

const darkTheme = {
    background: '#1a1a1a',
    cardBackground: '#2d2d2d',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    accent: '#FFD700',
    border: '#404040',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        padding: 8,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        gap: 24,
    },
    ayahCard: {
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 28,
        paddingVertical: 40,
        minHeight: 360,
        overflow: 'visible',
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    arabic: {
        fontSize: 36,
        fontWeight: '600',
        textAlign: 'right',
        marginBottom: 24,
        marginTop: 12,
        lineHeight: 72,
        writingDirection: 'rtl',
        letterSpacing: 2,
    },
    divider: {
        height: 3,
        marginVertical: 16,
        borderRadius: 2,
        alignSelf: 'center',
        width: 60,
    },
    translation: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(212, 175, 55, 0.2)',
    },
    surah: {
        fontSize: 14,
        fontWeight: '600',
    },
    ayahNumber: {
        fontSize: 13,
    },
    buttonContainer: {
        gap: 12,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 10,
    },
    navButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        fontWeight: '500',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
