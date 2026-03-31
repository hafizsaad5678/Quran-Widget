import { Text, View } from "react-native";

export const Card = ({
  children,
  className,
  noPadding = false,
  variant = "primary",
}) => {
  return (
    <View
      className={`
        relative rounded-[24px] border
        ${variant === "primary" ? "bg-sanctuary-card dark:bg-sanctuary-card-dark" : "bg-sanctuary-card/80 dark:bg-sanctuary-card-dark/80"}
        ${noPadding ? "p-0" : "p-5"}
        border-sanctuary-border/60 dark:border-sanctuary-border-dark/60
        ${className || ""}
      `}
    >
      {/* Decorative accent dot as seen in mockup elements */}
      <View className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-sanctuary-accent opacity-30" />
      {children}
    </View>
  );
};

export const Section = ({ children, className, title, titleStyle }) => {
  return (
    <View className={`mb-6 w-full ${className || ""}`}>
      {title && (
        <View className="flex-row items-center mb-2 px-2">
          <View className="w-1.5 h-1.5 rounded-full bg-sanctuary-accent mr-2" />
          <Text
            className={`text-[11px] font-bold uppercase tracking-[1.5px] text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark ${titleStyle || ""}`}
          >
            {title}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
};
