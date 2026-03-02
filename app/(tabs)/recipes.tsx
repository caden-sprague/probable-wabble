import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";
import { colors } from "@/lib/theme";

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
        <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, gap: 12, flexGrow: 1 }}>
            <Link href="/recipes/new" asChild>
                <Pressable style={{ padding: 14, borderRadius: 12, backgroundColor: colors.accent }}>
                    <Text style={{ color: colors.background, textAlign: "center", fontWeight: "700", fontSize: 15 }}>
                        + New Recipe
                    </Text>
                </Pressable>
            </Link>

            {recipes.length === 0 ? (
                <Text style={{ color: colors.muted, textAlign: "center", marginTop: 32 }}>No recipes yet.</Text>
            ) : (
                recipes.map((r) => (
                    <Pressable
                        key={r.id}
                        onPress={() => router.push(`/recipes/${r.id}`)}
                        style={{ padding: 16, backgroundColor: colors.card, borderRadius: 14 }}
                    >
                        <Text style={[styles.text, { fontWeight: "600", fontSize: 16 }]}>{r.name}</Text>
                        <Text style={{ color: colors.muted, fontSize: 13, marginTop: 4 }}>
                            {r.total_calories.toFixed(0)} kcal · {r.total_protein_g.toFixed(0)}g protein
                        </Text>
                    </Pressable>
                ))
            )}
        </ScrollView>
    );
}
