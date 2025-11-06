import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import Home from "./index";
import Profile from "./profile";
import Guides from "./guides";
import Wishlist from "./wishlist";

const TabLayout = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    {
      name: "Home",
      icon: "home" as keyof typeof Ionicons.glyphMap,
      iconOutline: "home-outline" as keyof typeof Ionicons.glyphMap,
      component: Home,
    },
    {
      name: "Guides",
      icon: "compass" as keyof typeof Ionicons.glyphMap,
      iconOutline: "compass-outline" as keyof typeof Ionicons.glyphMap,
      component: Guides,
    },
    {
      name: "Wishlist",
      icon: "heart" as keyof typeof Ionicons.glyphMap,
      iconOutline: "heart-outline" as keyof typeof Ionicons.glyphMap,
      component: Wishlist,
    },
    {
      name: "Profile",
      icon: "person" as keyof typeof Ionicons.glyphMap,
      iconOutline: "person-outline" as keyof typeof Ionicons.glyphMap,
      component: Profile,
    },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.name === activeTab)?.component || Home;

  return (
    <SafeAreaView style={styles.container}>
      {/* Screen Content */}
      <View style={styles.screenContainer}>
        <ActiveComponent />
      </View>

      {/* Custom Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, activeTab === tab.name && styles.activeTab]}
              onPress={() => setActiveTab(tab.name)}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={activeTab === tab.name ? tab.icon : tab.iconOutline}
                  size={24}
                  color={activeTab === tab.name ? "#FF6B35" : "#666"}
                />
              </View>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.name && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screenContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  bottomNav: {
    backgroundColor: "#fff",
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#f0f0f0",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    minWidth: 60,
  },
  activeTab: {},
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FF6B35",
    fontWeight: "600",
  },
});

export default TabLayout;
