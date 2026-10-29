import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import { useTheme } from "./ThemeContext";

const ToastContext = createContext(null);

const ICONS = {
  success: { name: "check-circle-outline", color: COLORS.status.success },
  error: { name: "alert-circle-outline", color: COLORS.status.error },
  warning: { name: "alert-outline", color: COLORS.status.warning },
  info: { name: "information-outline", color: COLORS.status.info },
};

function ToastItem({ toast, onDismiss }) {
  const { theme, isDarkMode } = useTheme();
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(-20));
  const baseIcon = ICONS[toast.type] ?? ICONS.info;
  // Success is yellow/gold (never green): bright gold on dark, deeper on light.
  const icon =
    toast.type === "success"
      ? { ...baseIcon, color: isDarkMode ? theme.accent : "#C99700" }
      : baseIcon;
  const isConfirm = toast.variant === "confirm";

  // Solid surface that matches the app (cards are translucent, which would let
  // the screen show through the toast).
  const surface = isDarkMode ? "#1C1C1E" : "#FFFFFF";
  const borderColor = `${theme.accent}40`;

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss(toast.id));
  }, [onDismiss, opacity, toast.id, translateY]);

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        speed: 20,
      }),
    ]).start();

    if (isConfirm) return undefined;
    const timer = setTimeout(() => dismiss(), toast.duration ?? 3500);
    return () => clearTimeout(timer);
  }, [dismiss, isConfirm, opacity, toast.duration, translateY]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        marginBottom: 10,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDarkMode ? 0.5 : 0.18,
        shadowRadius: 16,
        elevation: 10,
      }}
    >
      <TouchableOpacity
        onPress={isConfirm ? undefined : dismiss}
        activeOpacity={0.9}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 14,
          paddingVertical: 14,
          backgroundColor: surface,
          borderWidth: 1,
          borderColor,
          borderRadius: 24,
          gap: 12,
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${icon.color}26`,
          }}
        >
          <MaterialCommunityIcons
            name={icon.name}
            size={20}
            color={icon.color}
          />
        </View>
        <View style={{ flex: 1 }}>
          {toast.title && (
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: theme.accent,
                marginBottom: 2,
              }}
            >
              {toast.title}
            </Text>
          )}
          <Text
            style={{
              fontSize: 12.5,
              lineHeight: 18,
              color: theme.text,
              opacity: 0.75,
            }}
          >
            {toast.message}
          </Text>
          {isConfirm && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <TouchableOpacity
                onPress={() => {
                  toast.onCancel?.();
                  dismiss();
                }}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: theme.accent,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: theme.accent,
                  }}
                >
                  {toast.cancelText || "Cancel"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toast.onConfirm?.();
                  dismiss();
                }}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: theme.accent,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: theme.onAccent,
                  }}
                >
                  {toast.confirmText || "Confirm"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {!isConfirm && (
          <MaterialCommunityIcons
            name="close"
            size={16}
            color={theme.textSecondary}
          />
        )}
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

  const showAlert = useCallback(
    ({ title, message, type = "info", duration }) => {
      const id = Date.now().toString();
      setToasts((prev) => [
        ...prev,
        { id, title, message, type, duration, variant: "alert" },
      ]);
    },
    [],
  );

  const showConfirm = useCallback(
    ({
      title,
      message,
      type = "warning",
      confirmText = "Confirm",
      cancelText = "Cancel",
      onConfirm,
      onCancel,
    }) => {
      const id = Date.now().toString();
      setToasts((prev) => [
        ...prev,
        {
          id,
          title,
          message,
          type,
          variant: "confirm",
          confirmText,
          cancelText,
          onConfirm,
          onCancel,
        },
      ]);
    },
    [],
  );

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, showAlert, showConfirm }}>
      {children}
      <View
        style={{
          position: "absolute",
          top: insets.top + 74,
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
