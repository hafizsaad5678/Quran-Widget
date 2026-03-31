import React from "react";
import { Text, View } from "react-native";

/**
 * CircularProgress — pure React Native, no SVG dependency.
 * Renders a ring using a border trick with rotation.
 */
const CircularProgress = ({
  size = 180,
  strokeWidth = 14,
  progress = 0,
  label = "0/7",
  sublabel = "DAYS",
}) => {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const segments = 20;
  const filled = Math.round(clampedProgress * segments);

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* Ring made of segments */}
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * 360;
        const isActive = i < filled;
        const rad = (angle * Math.PI) / 180;
        const r = (size - strokeWidth) / 2;
        const cx = size / 2 + r * Math.sin(rad) - strokeWidth / 2;
        const cy = size / 2 - r * Math.cos(rad) - strokeWidth / 2;
        return (
          <View
            key={i}
            style={{
              position: "absolute",
              width: strokeWidth,
              height: strokeWidth,
              borderRadius: strokeWidth / 2,
              backgroundColor: isActive ? "#b0926a" : "rgba(176,146,106,0.15)",
              left: cx,
              top: cy,
            }}
          />
        );
      })}

      {/* Center label */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 36, fontWeight: "700", color: "#b0926a" }}>
          {label}
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "700", color: "#aaa", letterSpacing: 2, marginTop: 2 }}>
          {sublabel}
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;
