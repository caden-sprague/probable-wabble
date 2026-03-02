import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";
import { colors } from "@/lib/theme";

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
        <ScrollView contentContainerStyle={{ backgroundColor: colors.background, padding: 16, gap: 12, flexGrow: 1 }}>
            <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: 16, gap: 12 }}>
                <Text style={[styles.text, { fontWeight: "700", fontSize: 16 }]}>Today's Totals</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <MacroStat label="Calories" value={totals.calories.toFixed(0)} unit="kcal" color={colors.text} />
                    <MacroStat label="Protein" value={totals.protein_g.toFixed(1)} unit="g" color={colors.protein} />
                    <MacroStat label="Carbs" value={totals.carbs_g.toFixed(1)} unit="g" color={colors.carbs} />
                    <MacroStat label="Fat" value={totals.fat_g.toFixed(1)} unit="g" color={colors.fat} />
                </View>
            </View>

            {logs.length === 0 ? (
                <Text style={{ color: colors.muted, textAlign: "center", marginTop: 32 }}>No entries yet.</Text>
            ) : (
                logs.map((log) => {
                    const recipe = recipes.find((r) => r.id === log.recipe_id);
                    return (
                        <View key={log.id} style={{ backgroundColor: colors.card, borderRadius: 14, padding: 16, gap: 6 }}>
                            <Text style={[styles.text, { fontWeight: "600", fontSize: 15 }]}>
                                {recipe?.name ?? "Unknown"}
                            </Text>
                            <Text style={{ color: colors.muted, fontSize: 13 }}>
                                {log.amount_g.toFixed(1)} oz · {log.calories.toFixed(0)} kcal
                            </Text>
                            <View style={{ flexDirection: "row", gap: 12, marginTop: 2 }}>
                                <Text style={{ color: colors.protein, fontSize: 13 }}>P {log.protein_g.toFixed(1)}g</Text>
                                <Text style={{ color: colors.carbs, fontSize: 13 }}>C {log.carbs_g.toFixed(1)}g</Text>
                                <Text style={{ color: colors.fat, fontSize: 13 }}>F {log.fat_g.toFixed(1)}g</Text>
                            </View>
                        </View>
                    );
                })
            )}
        </ScrollView>
    );
}

function MacroStat({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
    return (
        <View style={{ alignItems: "center", gap: 2 }}>
            <Text style={{ color, fontSize: 20, fontWeight: "700" }}>{value}</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>{unit}</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>{label}</Text>
        </View>
    );
}
