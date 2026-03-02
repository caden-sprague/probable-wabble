import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";

export default function RecipesScreen() {
    const { ready, bootstrap, recipes, refreshRecipes } = useAppStore();

    React.useEffect(() => {
        if (!ready) bootstrap();
    }, [ready, bootstrap]);

    useFocusEffect(
        React.useCallback(() => {
            refreshRecipes();
        }, [refreshRecipes])
    );

    return (
        <ScrollView contentContainerStyle={[styles.container, { padding: 16, gap: 12 }]}>
            <Link href="/recipes/new" asChild>
                <Pressable style={{ padding: 12, borderWidth: 1, borderRadius: 12 }}>
                    <Text style={[styles.text, { textAlign: "center" }]}>+ New Recipe</Text>
                </Pressable>
            </Link>

            {recipes.length === 0 ? (
                <Text style={[styles.text, { opacity: 0.6 }]}>No recipes yet.</Text>
            ) : (
                recipes.map((r) => (
                    <Pressable
                        key={r.id}
                        onPress={() => router.push(`/recipes/${r.id}`)}
                        style={{ padding: 12, borderWidth: 1, borderRadius: 12 }}
                    >
                        <Text style={[styles.text, { fontWeight: "600" }]}>{r.name}</Text>
                    </Pressable>
                ))
            )}
        </ScrollView>
    );
}
