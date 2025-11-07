import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: "Poppin", 
          fontSize: 12,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const map: Record<string, [any, any]> = {
            index: ["home-outline", "home"],
            guides: ["compass-outline", "compass"],
            wishlist: ["heart-outline", "heart"],
            profile: ["person-outline", "person"],
          };
          const [outline, filled] = map[route.name] ?? [
            "ellipse-outline",
            "ellipse",
          ];
          return (
            <Ionicons
              name={focused ? (filled as any) : (outline as any)}
              size={size}
              color={color}
            />
          );
        },
      })}
      initialRouteName="index"
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="guides" options={{ title: "Guides" }} />
      <Tabs.Screen name="wishlist" options={{ title: "Wishlist" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
