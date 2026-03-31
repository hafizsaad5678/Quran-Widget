import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { PanResponder, View } from "react-native";

export default function SwipeBackContainer({
  children,
  enabled = true,
  threshold = 90,
}) {
  const router = useRouter();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gesture) => {
        if (!enabled) return false;
        const isHorizontal =
          Math.abs(gesture.dx) > 18 && Math.abs(gesture.dy) < 16;
        const isEdgeStart = gesture.x0 < 28;
        return isHorizontal && isEdgeStart;
      },
      onPanResponderRelease: (_evt, gesture) => {
        if (!enabled) return;
        const shouldGoBack =
          gesture.dx > threshold && Math.abs(gesture.dy) < 40;
        if (shouldGoBack) {
          router.back();
        }
      },
    }),
  ).current;

  return (
    <View className="flex-1" {...panResponder.panHandlers}>
      {children}
    </View>
  );
}
