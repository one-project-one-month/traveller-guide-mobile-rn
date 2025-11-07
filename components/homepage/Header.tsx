import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon } from "phosphor-react-native";
import { colors } from "@/constants/colors";

const Header = () => {
  const notificationCount = 3;
  return (
    <View className="flex-row px-[26px] py-7 justify-between">
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: "https://picsum.photos/seed/avatar/100" }}
          className="w-14 h-14 rounded-full"
        />
        <View>
          <Text className="font-poppin text-[14px] font-semibold">
            Welcome Back!
          </Text>
          <Text className="font-poppin text-[12px] font-400">
            Thiri Shin Thant
          </Text>
        </View>
      </View>
      <TouchableOpacity className="justify-center items-center">
        <BellIcon size={32} color="#000" weight="regular" />
        {notificationCount > 0 && <View className="absolute top-1 right-0.5
        bg-orange-500 w-5 h-5 rounded-full justify-center items-center">
          <Text className="text-white text-[12px] font-poppinBold">
            {notificationCount}
          </Text>
        </View>}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
