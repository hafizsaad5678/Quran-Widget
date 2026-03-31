import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export const Button = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className,
  textClassName,
}) => {
  const isSecondary = variant === "secondary";
  const isOutline = variant === "outline";
  const isDanger = variant === "danger";

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.7}
      className={`
        px-6 py-4 rounded-2xl items-center justify-center
        ${!isSecondary && !isOutline && !isDanger ? "bg-sanctuary-accent shadow-sm" : ""}
        ${isSecondary ? "bg-sanctuary-accent/20 border border-sanctuary-accent/30" : ""}
        ${isOutline ? "bg-transparent border border-sanctuary-border dark:border-sanctuary-border-dark" : ""}
        ${isDanger ? "bg-red-500" : ""}
        ${disabled ? "opacity-50 grayscale" : ""}
        ${className || ""}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#b0926a"} />
      ) : (
        <Text
          className={`
            text-base font-bold tracking-wide
            ${!isSecondary && !isOutline && !isDanger ? "text-white" : ""}
            ${isSecondary || isOutline ? "text-sanctuary-accent" : ""}
            ${isDanger ? "text-white" : ""}
            ${textClassName || ""}
          `}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
