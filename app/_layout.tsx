import { Stack } from "expo-router";
import { colors } from "@/lib/theme";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="recipes/new" options={{
                headerShown: true,
                title: "New Recipe",
                headerBackTitle: "Recipes",
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.text,
                contentStyle: { backgroundColor: colors.background },
            }} />
            <Stack.Screen name="recipes/[id]" options={{
                headerShown: true,
                title: "Recipe Details",
                headerBackTitle: "Recipes",
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.text,
                contentStyle: { backgroundColor: colors.background },
            }} />
            <Stack.Screen name="log/new" options={{
                headerShown: true,
                title: "Log Serving",
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.text,
                contentStyle: { backgroundColor: colors.background },
            }} />
        </Stack>
    );
}
