import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";
import { colors } from "@/lib/theme";

export default function RecipeDetailsScreen() {
    const { id } = useLocalSearchParams();
    const recipe = useAppStore(s => s.recipes.find(r => r.id === Number(id)));
    const deleteRecipe = useAppStore(s => s.deleteRecipe);

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Recipe not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: colors.background, padding: 16, gap: 16, flexGrow: 1 }}>
            <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: 16, gap: 12 }}>
                <Text style={[styles.text, { fontSize: 22, fontWeight: "700" }]}>{recipe.name}</Text>
                <Text style={{ color: colors.muted, fontSize: 14 }}>Net weight: {recipe.net_weight_g.toFixed(0)} oz</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                    <MacroItem label="Calories" value={recipe.total_calories.toFixed(0)} unit="kcal" color={colors.text} />
                    <MacroItem label="Protein" value={recipe.total_protein_g.toFixed(1)} unit="g" color={colors.protein} />
                    <MacroItem label="Carbs" value={recipe.total_carbs_g.toFixed(1)} unit="g" color={colors.carbs} />
                    <MacroItem label="Fat" value={recipe.total_fat_g.toFixed(1)} unit="g" color={colors.fat} />
                </View>
            </View>

            <Pressable
                onPress={() => router.push(`/log/new?recipeId=${recipe.id}`)}
                style={{ padding: 14, borderRadius: 12, backgroundColor: colors.accent }}
            >
                <Text style={{ color: colors.background, textAlign: "center", fontWeight: "700", fontSize: 15 }}>
                    Log Serving
                </Text>
            </Pressable>

            <Pressable
                onPress={() => Alert.alert(
                    "Delete Recipe",
                    `Delete "${recipe.name}"? This will also remove all log entries for this recipe.`,
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Delete", style: "destructive", onPress: async () => {
                            await deleteRecipe(recipe.id);
                            router.back();
                        }},
                    ]
                )}
                style={{ padding: 14, borderRadius: 12, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.danger }}
            >
                <Text style={{ color: colors.danger, textAlign: "center", fontWeight: "600", fontSize: 15 }}>
                    Delete Recipe
                </Text>
            </Pressable>
        </ScrollView>
    );
}

function MacroItem({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
    return (
        <View style={{ alignItems: "center", gap: 2 }}>
            <Text style={{ color, fontSize: 18, fontWeight: "700" }}>{value}</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>{unit}</Text>
            <Text style={{ color: colors.muted, fontSize: 11 }}>{label}</Text>
        </View>
    );
}
