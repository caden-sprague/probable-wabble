import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";

export default function RecipeDetailsScreen() {
    const { id } = useLocalSearchParams();
    const recipe = useAppStore(s => s.recipes.find(r => r.id === Number(id)));

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Recipe not found.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { alignItems: "flex-start", padding: 16, gap: 12 }]}>
            <Text style={[styles.text, { fontSize: 22, fontWeight: "700" }]}>{recipe.name}</Text>
            <Text style={styles.text}>Net weight: {recipe.net_weight_g.toFixed(0)} g</Text>
            <Text style={styles.text}>Calories: {recipe.total_calories.toFixed(0)} kcal</Text>
            <Text style={styles.text}>Protein: {recipe.total_protein_g} g</Text>
            <Text style={styles.text}>Carbs: {recipe.total_carbs_g} g</Text>
            <Text style={styles.text}>Fat: {recipe.total_fat_g} g</Text>
        </View>
    );
}
