import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CollectionCard = ({ type, title, subtitle, count, tag, icon, color, onPress }) => {
  if (type === "empty") {
    return (
      <TouchableOpacity 
        onPress={onPress}
        className="w-full h-32 rounded-[40px] border-2 border-dashed border-sanctuary-border/60 bg-white/10 items-center justify-center mt-4"
      >
        <View className="w-12 h-12 rounded-full bg-white items-center justify-center shadow-sm mb-4">
           <MaterialCommunityIcons name="plus" size={24} color="#b0926a" />
        </View>
        <Text className="text-[10px] font-bold uppercase tracking-[3px] text-sanctuary-text/80">
          Create New Collection
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-full rounded-[40px] p-8 mb-6 bg-white/80 shadow-sm border border-white/20"
      style={{ backgroundColor: color || 'white' }}
    >
      <View className="flex-row justify-between items-start mb-6">
        <View className="w-14 h-14 rounded-2xl bg-black/5 items-center justify-center">
            <MaterialCommunityIcons name={icon} size={32} color="#5C4033" />
        </View>
        {tag && (
          <View className="bg-sanctuary-accent/20 px-4 py-1.5 rounded-full">
            <Text className="text-[10px] font-bold text-sanctuary-accent/80 uppercase tracking-widest">{tag}</Text>
          </View>
        )}
      </View>
      
      <View className="flex-row items-center justify-between">
         <View className="flex-1 mr-4">
            <Text className="text-3xl font-serif font-bold text-sanctuary-text mb-2">{title}</Text>
            {subtitle && (
              <Text className="text-sm italic text-sanctuary-text-muted leading-5">
              &quot;{subtitle}&quot;
            </Text>
            )}
         </View>
         <MaterialCommunityIcons name="arrow-right" size={24} color="#5C4033" />
      </View>

      <View className="mt-8 flex-row items-center justify-between border-t border-black/5 pt-6">
        <Text className="text-[10px] font-bold uppercase tracking-[2.5px] text-sanctuary-text-muted">
           {count}
        </Text>
        <MaterialCommunityIcons name="dots-horizontal" size={20} color="#cdc6b6" />
      </View>
    </TouchableOpacity>
  );
};

export default CollectionCard;
