import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const quotes = [
    {
        id: 1,
        text: 'The best of you are those who are best to their families.',
        author: 'Prophet Muhammad (PBUH)',
    },
    {
        id: 2,
        text: 'Kindness is a mark of faith, and whoever is not kind has no faith.',
        author: 'Prophet Muhammad (PBUH)',
    },
    {
        id: 3,
        text: 'Do not despair of the mercy of Allah.',
        author: 'Quran 39:53',
    },
    {
        id: 4,
        text: 'Verily, with hardship comes ease.',
        author: 'Quran 94:5',
    },
    {
        id: 5,
        text: 'The strong person is not the one who wrestles, but the one who controls himself in anger.',
        author: 'Prophet Muhammad (PBUH)',
    },
    {
        id: 6,
        text: 'Seek knowledge from the cradle to the grave.',
        author: 'Prophet Muhammad (PBUH)',
    },
];

export default function QuotesScreen() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="chevron-left" size={28} color={theme.accent} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Islamic Quotes</Text>
                <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
                    <MaterialCommunityIcons
                        name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
                        size={24}
                        color={theme.accent}
                    />
                </TouchableOpacity>
            </View>

            {/* Quotes List */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {quotes.map((quote, index) => (
                    <View key={quote.id} style={[styles.quoteCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                        <View style={styles.quoteContent}>
                            <MaterialCommunityIcons name="format-quote-open" size={24} color={theme.accent} />
                            <Text style={[styles.quoteText, { color: theme.text }]}>{quote.text}</Text>
                            <MaterialCommunityIcons name="format-quote-close" size={24} color={theme.accent} style={styles.closeQuote} />
                        </View>
                        <Text style={[styles.quoteAuthor, { color: theme.textSecondary }]}>— {quote.author}</Text>
                    </View>
                ))}
            </ScrollView>
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
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 16,
    },
    quoteCard: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 20,
        marginBottom: 12,
    },
    quoteContent: {
        marginBottom: 12,
    },
    quoteText: {
        fontSize: 16,
        lineHeight: 26,
        marginVertical: 12,
        fontStyle: 'italic',
    },
    closeQuote: {
        alignSelf: 'flex-end',
    },
    quoteAuthor: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'right',
    },
});
