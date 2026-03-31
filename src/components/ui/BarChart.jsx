import React from 'react';
import { View, Text } from 'react-native';

const BarChart = ({ data, labels, title, target }) => {
  return (
    <View className="mt-4">
      <View className="mb-4">
        <Text className="text-lg font-bold text-sanctuary-text dark:text-sanctuary-text-dark">
          {title}
        </Text>
        <Text className="text-[10px] font-bold text-sanctuary-text-muted dark:text-sanctuary-text-mutedDark">
          Target: {target}
        </Text>
      </View>
      
      <View className="flex-row items-end justify-between px-2 h-40">
        {data.map((value, idx) => {
          const isToday = idx === 5; // SAT in the mockup
          return (
            <View key={idx} className="items-center flex-1">
              <View 
                className={`w-4 rounded-full ${isToday ? 'bg-sanctuary-accent' : 'bg-sanctuary-accent/20'}`} 
                style={{ height: `${value}%`, minHeight: 4 }} 
              />
              <Text className={`mt-3 text-[8px] font-bold uppercase tracking-wider ${isToday ? 'text-sanctuary-text' : 'text-sanctuary-text-muted'} dark:${isToday ? 'text-sanctuary-text-dark' : 'text-sanctuary-text-mutedDark'}`}>
                {labels[idx]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BarChart;
