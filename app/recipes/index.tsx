// list recipes
import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useAppStore } from "../../lib/store";
import { styles } from "@/lib/style";

export default function RecipesScreen () {
    const {ready, bootstrap, recipes, refreshRecipes } = useAppStore();

    // Run once when the screen first appears
    React.useEffect(() => {
        if (!ready) bootstrap();
    }, [ready, bootstrap]);

    // Refresh when you return to this screen
    useFocusEffect(
        React.useCallback(() => {
            refreshRecipes();
        }, [refreshRecipes])
    );

    return (
        <ScrollView contentContainerStyle={[styles.container, {padding:16, gap:12}]}>
            <Link href={"/recipes/new"} asChild>
                <Pressable style={{padding:12, borderWidth: 1, borderRadius: 12}}>
                    <Text style={[styles.text, { textAlign: "center" }]}>+ New Recipe</Text>
                </Pressable>
            </Link>

            {recipes.length === 0 ? (
                <Text style={{ opacity: 0.6 }}>No recipes yet.</Text>
            ) : (
                recipes.map((r) => (
                    <View key={r.id} style={{padding:12, borderWidth: 1, borderRadius: 12}}>
                        <Text style={[styles.text, { fontWeight: "600"}]} >{r.name}</Text>
                        <Text style={styles.text}>Net weight: {r.net_weight_g.toFixed(0)} g</Text>
                        <Text style={[styles.text]}>
                            Total: {r.total_calories.toFixed(0)} kcal - P {r.total_protein_g} / C {r.total_carbs_g} / F {r.total_fat_g}
                        </Text>
                    </View>
                ))
            )
        }
        </ScrollView>
    )
}