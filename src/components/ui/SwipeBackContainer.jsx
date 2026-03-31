import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { PanResponder, View } from "react-native";

export default function SwipeBackContainer({
  children,
  enabled = true,
  threshold = 60,
}) {
  const router = useRouter();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gesture) => {
        if (!enabled) return false;
        return (
          Math.abs(gesture.dx) > 10 &&
          Math.abs(gesture.dy) < 20 &&
          gesture.x0 < 50 &&
          gesture.dx > 0
        );
      },
      onPanResponderRelease: (_evt, gesture) => {
        if (!enabled) return;
        if (gesture.dx > threshold && Math.abs(gesture.dy) < 60) {
          router.back();
        }
      },
    }),
  ).current;

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {children}
    </View>
  );
}
