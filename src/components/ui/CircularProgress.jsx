import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircularProgress = ({ size = 200, strokeWidth = 15, progress = 0.7, label = "5/7", sublabel = "DAYS" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#fdf9f3" // Base background color or variant
          strokeWidth={strokeWidth}
          fill="transparent"
          style={{ opacity: 0.1 }}
        />
        {/* Progress Circle (Track) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#b0926a" // sanctuary-accent/10 roughly
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeOpacity={0.1}
        />
        {/* Progress Arc */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#b0926a" // sanctuary-accent
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute items-center justify-center">
        <Text className="text-4xl font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
          {label}
        </Text>
        <Text className="text-xs font-bold text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark uppercase tracking-[2px]">
          {sublabel}
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;
