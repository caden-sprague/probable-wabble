import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/lib/theme";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { backgroundColor: colors.background, borderTopColor: "rgba(255,255,255,0.1)" },
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: "rgba(255,255,255,0.4)",
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.text,
            }}
        >
            <Tabs.Screen
                name="log"
                options={{
                    title: "Log",
                    tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="recipes"
                options={{
                    title: "Recipes",
                    tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
