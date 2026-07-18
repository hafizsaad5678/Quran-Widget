import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ToastContext = createContext(null);

const ICONS = {
  success: { name: "check-circle-outline", color: "#4caf50" },
  error: { name: "alert-circle-outline", color: "#f44336" },
  warning: { name: "alert-outline", color: "#ff9800" },
  info: { name: "information-outline", color: "#b0926a" },
};

function ToastItem({ toast, onDismiss }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const icon = ICONS[toast.type] ?? ICONS.info;
  const isConfirm = toast.variant === "confirm";
  const cardBackground = "#facc15";
  const titleColor = "#000";
  const messageColor = "#000";
  const closeColor = "#000";
  const borderColor = "#eab308";

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
        onPress={isConfirm ? undefined : dismiss}
        activeOpacity={0.9}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: isConfirm ? 12 : 14,
          backgroundColor: cardBackground,
          borderWidth: 1,
          borderColor,
          borderLeftWidth: 4,
          borderLeftColor: icon.color,
          borderRadius: 18,
          gap: 12,
        }}
      >
        <MaterialCommunityIcons name={icon.name} size={22} color={icon.color} />
        <View style={{ flex: 1 }}>
          {toast.title && (
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: titleColor,
                marginBottom: 2,
              }}
            >
              {toast.title}
            </Text>
          )}
          <Text style={{ fontSize: 13, color: messageColor, lineHeight: 18 }}>
            {toast.message}
          </Text>
          {isConfirm && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  toast.onCancel?.();
                  dismiss();
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor,
                  backgroundColor: "#fde68a",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: messageColor,
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
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 999,
                  backgroundColor: "#111827",
                }}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: "700", color: "#fff" }}
                >
                  {toast.confirmText || "Confirm"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {!isConfirm && (
          <MaterialCommunityIcons name="close" size={16} color={closeColor} />
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
