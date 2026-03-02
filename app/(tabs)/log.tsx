import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";

export default function LogScreen() {
    const { logs, recipes, refreshLogs } = useAppStore();

    const today = new Date().toISOString().slice(0, 10);

    useFocusEffect(
        React.useCallback(() => {
            refreshLogs(today);
        }, [refreshLogs, today])
    );

    const totals = logs.reduce(
        (acc, log) => ({
            calories: acc.calories + log.calories,
            protein_g: acc.protein_g + log.protein_g,
            carbs_g: acc.carbs_g + log.carbs_g,
            fat_g: acc.fat_g + log.fat_g,
        }),
        { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
    );

    return (
        <ScrollView contentContainerStyle={[styles.container, { padding: 16, gap: 12 }]}>
            <View style={{ padding: 12, borderWidth: 1, borderRadius: 12, gap: 4 }}>
                <Text style={[styles.text, { fontWeight: "600" }]}>Daily Totals</Text>
                <Text style={styles.text}>Calories: {totals.calories.toFixed(0)} kcal</Text>
                <Text style={styles.text}>Protein: {totals.protein_g.toFixed(1)} g</Text>
                <Text style={styles.text}>Carbs: {totals.carbs_g.toFixed(1)} g</Text>
                <Text style={styles.text}>Fat: {totals.fat_g.toFixed(1)} g</Text>
            </View>

            {logs.length === 0 ? (
                <Text style={[styles.text, { opacity: 0.6 }]}>No entries yet.</Text>
            ) : (
                logs.map((log) => {
                    const recipe = recipes.find((r) => r.id === log.recipe_id);
                    return (
                        <View key={log.id} style={{ padding: 12, borderWidth: 1, borderRadius: 12, gap: 4 }}>
                            <Text style={[styles.text, { fontWeight: "600" }]}>{recipe?.name ?? "Unknown recipe"}</Text>
                            <Text style={styles.text}>{log.amount_g.toFixed(1)} oz · {log.calories.toFixed(0)} kcal</Text>
                            <Text style={[styles.text, { opacity: 0.7 }]}>
                                P: {log.protein_g.toFixed(1)} g · C: {log.carbs_g.toFixed(1)} g · F: {log.fat_g.toFixed(1)} g
                            </Text>
                        </View>
                    );
                })
            )}
        </ScrollView>
    );
}
