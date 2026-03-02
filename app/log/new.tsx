import React from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAppStore } from "@/lib/store";
import { styles } from "@/lib/style";

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

    async function onSubmit() {
        const num = Number(amount.trim());
        if (amount.trim() === "" || Number.isNaN(num) || num <= 0) {
            Alert.alert("ERROR", "Enter a valid amount greater than 0");
            return;
        }

        if (!recipe) {
            Alert.alert("ERROR", "Recipe not found.");
            return;
        }

        const ratio = num / recipe!.net_weight_g;

        await addLog({
            recipe_id: recipe!.id,
            eaten_at: new Date().toISOString(),
            amount_g: num,
            calories: recipe!.total_calories * ratio,
            protein_g: recipe!.total_protein_g * ratio,
            carbs_g: recipe!.total_carbs_g * ratio,
            fat_g: recipe!.total_fat_g * ratio,
        });

        router.replace("/log");
    }

    return (
        <View style={[styles.container, { padding: 16, gap: 16 }]}>
            <Text style={[styles.text, { fontSize: 20, fontWeight: "600" }]}>{recipe.name}</Text>

            <View style={{ gap: 6 }}>
                <Text style={styles.text}>Amount eaten (oz)</Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                    placeholder="oz"
                    style={[styles.text, { padding: 12, borderWidth: 1, borderRadius: 10 }]}
                />
            </View>

            <Pressable
                onPress={onSubmit}
                style={{ padding: 14, borderWidth: 1, borderRadius: 12 }}
            >
                <Text style={[styles.text, { textAlign: "center", fontWeight: "600" }]}>Log Serving</Text>
            </Pressable>
        </View>
    );
}
