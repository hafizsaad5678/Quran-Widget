import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "./ThemeContext";

const ToastContext = createContext(null);

const ICONS = {
    success: { name: "check-circle-outline", color: "#4caf50" },
    error: { name: "alert-circle-outline", color: "#f44336" },
    warning: { name: "alert-outline", color: "#ff9800" },
    info: { name: "information-outline", color: "#b0926a" },
};

function ToastItem({ toast, onDismiss }) {
    const { theme } = useTheme();
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;
    const icon = ICONS[toast.type] ?? ICONS.info;

    React.useEffect(() => {
        Animated.parallel([
            Animated.spring(opacity, { toValue: 1, useNativeDriver: true, speed: 20 }),
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true, speed: 20 }),
        ]).start();

        const timer = setTimeout(() => dismiss(), toast.duration ?? 3500);
        return () => clearTimeout(timer);
    }, []);

    const dismiss = () => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: -20, duration: 250, useNativeDriver: true }),
        ]).start(() => onDismiss(toast.id));
    };

    return (
        <Animated.View
            style={{
                opacity,
                transform: [{ translateY }],
                marginBottom: 8,
                borderRadius: 18,
                overflow: "hidden",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
            }}
        >
            <TouchableOpacity
                onPress={dismiss}
                activeOpacity={0.9}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    backgroundColor: theme.cardBackground,
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderLeftWidth: 4,
                    borderLeftColor: icon.color,
                    borderRadius: 18,
                    gap: 12,
                }}
            >
                <MaterialCommunityIcons name={icon.name} size={22} color={icon.color} />
                <View style={{ flex: 1 }}>
                    {toast.title && (
                        <Text style={{ fontSize: 13, fontWeight: "700", color: theme.text, marginBottom: 2 }}>
                            {toast.title}
                        </Text>
                    )}
                    <Text style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 18 }}>
                        {toast.message}
                    </Text>
                </View>
                <MaterialCommunityIcons name="close" size={16} color={theme.textSecondary} />
            </TouchableOpacity>
        </Animated.View>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const insets = useSafeAreaInsets();

    const show = useCallback(({ title, message, type = "info", duration }) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, title, message, type, duration }]);
    }, []);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <View
                style={{
                    position: "absolute",
                    top: insets.top + 8,
                    left: 16,
                    right: 16,
                    zIndex: 9999,
                    pointerEvents: "box-none",
                }}
            >
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
                ))}
            </View>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
