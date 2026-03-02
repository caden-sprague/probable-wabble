import React from "react";
import { View, Text, TextInput, Alert, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";
import { colors } from "@/lib/theme";

export default function LogServingScreen() {
    const { recipeId } = useLocalSearchParams();
    const recipe = useAppStore(s => s.recipes.find(r => r.id === Number(recipeId)));
    const addLog = useAppStore(s => s.addLog);

    const [amount, setAmount] = React.useState("");

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Recipe not found.</Text>
            </View>
        );
    }

    const num = Number(amount.trim());
    const ratio = !isNaN(num) && num > 0 ? num / recipe.net_weight_g : null;

    async function onSubmit() {
        if (amount.trim() === "" || Number.isNaN(num) || num <= 0) {
            Alert.alert("ERROR", "Enter a valid amount greater than 0");
            return;
        }

        const r = num / recipe!.net_weight_g;

        await addLog({
            recipe_id: recipe!.id,
            eaten_at: new Date().toISOString(),
            amount_g: num,
            calories: recipe!.total_calories * r,
            protein_g: recipe!.total_protein_g * r,
            carbs_g: recipe!.total_carbs_g * r,
            fat_g: recipe!.total_fat_g * r,
        });

        router.replace("/log");
    }

    return (
        <ScrollView
            contentContainerStyle={{ backgroundColor: colors.background, padding: 16, gap: 16, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: 16, gap: 4 }}>
                <Text style={[styles.text, { fontSize: 18, fontWeight: "700" }]}>{recipe.name}</Text>
                <Text style={{ color: colors.muted, fontSize: 13 }}>Net weight: {recipe.net_weight_g.toFixed(0)} oz</Text>
            </View>

            <View style={{ gap: 6 }}>
                <Text style={{ color: colors.muted, fontSize: 13 }}>Amount eaten (oz)</Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                    placeholder="0"
                    placeholderTextColor={colors.muted}
                    style={{ color: colors.text, padding: 12, backgroundColor: colors.surface, borderRadius: 10, fontSize: 15 }}
                />
            </View>

            {ratio !== null && (
                <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: 16, gap: 8 }}>
                    <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.8 }}>
                        Preview
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <PreviewStat label="Calories" value={(recipe.total_calories * ratio).toFixed(0)} unit="kcal" color={colors.text} />
                        <PreviewStat label="Protein" value={(recipe.total_protein_g * ratio).toFixed(1)} unit="g" color={colors.protein} />
                        <PreviewStat label="Carbs" value={(recipe.total_carbs_g * ratio).toFixed(1)} unit="g" color={colors.carbs} />
                        <PreviewStat label="Fat" value={(recipe.total_fat_g * ratio).toFixed(1)} unit="g" color={colors.fat} />
                    </View>
                </View>
            )}

            <Pressable
                onPress={onSubmit}
                style={{ padding: 14, borderRadius: 12, backgroundColor: colors.accent }}
            >
                <Text style={{ color: colors.background, textAlign: "center", fontWeight: "700", fontSize: 15 }}>
                    Log Serving
                </Text>
            </Pressable>
        </ScrollView>
    );
}

function PreviewStat({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
    return (
        <View style={{ alignItems: "center", gap: 2 }}>
            <Text style={{ color, fontSize: 18, fontWeight: "700" }}>{value}</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>{unit}</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>{label}</Text>
        </View>
    );
}
