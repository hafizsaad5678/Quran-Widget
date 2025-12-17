import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ayatData from '../../assets/ayat/daily_50_ayat.json';

export default function AyahScreen() {
    const router = useRouter();
    const [selectedAyah, setSelectedAyah] = useState(ayatData[0]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const handleSelectAyah = (ayah) => {
        setSelectedAyah(ayah);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="chevron-left" size={28} color={theme.accent} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Browse Ayat</Text>
                <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
                    <MaterialCommunityIcons
                        name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
                        size={24}
                        color={theme.accent}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Selected Ayah Display */}
                <View style={[styles.selectedAyahBox, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                    <Text style={[styles.arabic, { color: theme.text }]}>{selectedAyah.arabic}</Text>
                    <View style={[styles.divider, { backgroundColor: theme.accent }]} />
                    <Text style={[styles.translation, { color: theme.textSecondary }]}>{selectedAyah.translation}</Text>
                    <View style={styles.infoRow}>
                        <Text style={[styles.surah, { color: theme.text }]}>{selectedAyah.surah}</Text>
                        <Text style={[styles.ayahNumber, { color: theme.textSecondary }]}>Ayah {selectedAyah.ayah}</Text>
                    </View>
                </View>

                {/* Ayat List */}
                <Text style={[styles.listTitle, { color: theme.text }]}>All Ayat ({ayatData.length})</Text>
                <FlatList
                    data={ayatData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelectAyah(item)}
                            style={[
                                styles.ayahItem,
                                {
                                    backgroundColor: selectedAyah.id === item.id ? theme.accent : theme.cardBackground,
                                    borderColor: theme.border,
                                },
                            ]}
                        >
                            <View style={styles.ayahItemContent}>
                                <Text
                                    style={[
                                        styles.ayahItemSurah,
                                        { color: selectedAyah.id === item.id ? '#FFFFFF' : theme.text },
                                    ]}
                                >
                                    {item.surah}
                                </Text>
                                <Text
                                    style={[
                                        styles.ayahItemNumber,
                                        { color: selectedAyah.id === item.id ? '#FFFFFF' : theme.textSecondary },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.translation}
                                </Text>
                            </View>
                            <Text
                                style={[
                                    styles.ayahItemId,
                                    { color: selectedAyah.id === item.id ? '#FFFFFF' : theme.accent },
                                ]}
                            >
                                {item.id}
                            </Text>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    style={styles.list}
                />
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
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    selectedAyahBox: {
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 28,
        paddingVertical: 40,
        marginBottom: 20,
        minHeight: 360,
        overflow: 'visible',
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
        height: 2,
        marginVertical: 12,
        borderRadius: 1,
    },
    translation: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    surah: {
        fontSize: 14,
        fontWeight: '600',
    },
    ayahNumber: {
        fontSize: 13,
    },
    listTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    list: {
        flex: 1,
    },
    ayahItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        padding: 12,
        marginBottom: 8,
    },
    ayahItemContent: {
        flex: 1,
    },
    ayahItemSurah: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    ayahItemNumber: {
        fontSize: 12,
    },
    ayahItemId: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
    },
});
