import {Stack} from "expo-router";
import {colors} from "@/lib/theme";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, title: "Home"}}/>
            <Stack.Screen name="recipes/index" options={{headerShown: false, title: "Recipes"}}/>
            <Stack.Screen name="recipes/new" options={{
                headerShown: true,
                title: "New Recipe",
                headerStyle: {backgroundColor: colors.background},
                headerTintColor: colors.text,
                contentStyle: {backgroundColor: colors.background}
            }}/>
        </Stack>
    );
}