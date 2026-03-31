import React from "react";
import { Text, View } from "react-native";

const BAR_MAX_HEIGHT = 100;

const BarChart = ({ data = [], labels = [], target }) => {
  return (
    <View>
      {target ? (
        <Text className="text-[10px] font-bold text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark mb-3">
          {target}
        </Text>
      ) : null}

      <View className="flex-row items-end justify-between" style={{ height: BAR_MAX_HEIGHT + 24 }}>
        {data.map((value, idx) => {
          const barHeight = Math.max(4, (value / 100) * BAR_MAX_HEIGHT);
          const isActive = value > 0;
          return (
            <View key={idx} className="flex-1 items-center justify-end">
              <View
                style={{
                  height: barHeight,
                  width: 10,
                  borderRadius: 6,
                  backgroundColor: isActive ? "#b0926a" : "rgba(176,146,106,0.18)",
                  marginBottom: 6,
                }}
              />
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: "700",
                  color: isActive ? "#b0926a" : "#aaa",
                  letterSpacing: 0.5,
                }}
              >
                {labels[idx] ?? ""}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BarChart;
