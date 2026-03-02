import React from "react";
import { View, Text, TextInput, Alert, Pressable, ScrollView } from "react-native";
import { styles } from "@/lib/style";
import { colors } from "@/lib/theme";
import { useAppStore } from "@/lib/store";
import { router } from "expo-router";

export default function NewRecipeScreen() {
    const addRecipe = useAppStore((s) => s.addRecipe);

    const [name, setName] = React.useState("");
    const [netWeight, setNetWeight] = React.useState("");
    const [cal, setCal] = React.useState("");
    const [carbs, setCarbs] = React.useState("");
    const [protein, setProtein] = React.useState("");
    const [fat, setFat] = React.useState("");

    const fields = [
        { label: "Net Weight", value: netWeight },
        { label: "Calories", value: cal },
        { label: "Carbs", value: carbs },
        { label: "Protein", value: protein },
        { label: "Fat", value: fat },
    ];

    async function onSave() {
        if (!validateFields()) return;

        await addRecipe({
            name,
            net_weight_g: Number(netWeight),
            total_calories: Number(cal),
            total_protein_g: Number(protein),
            total_carbs_g: Number(carbs),
            total_fat_g: Number(fat),
        });

        router.back();
    }

    const validateFields = () => {
        if (name.trim() === "") {
            Alert.alert("ERROR", "Name is required");
            return false;
        }

        for (const field of fields) {
            const num = Number(field.value.trim());

            if (field.value.trim() === "") {
                Alert.alert("ERROR", `${field.label} is required`);
                return false;
            }

            if (Number.isNaN(num)) {
                Alert.alert("ERROR", `${field.label} must be a number`);
                return false;
            }

            if (num < 0) {
                Alert.alert("ERROR", `${field.label} must be greater than 0`);
                return false;
            }
        }

        return true;
    };

    return (
        <ScrollView
            contentContainerStyle={{ backgroundColor: colors.background, padding: 16, gap: 14, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <Field label="Recipe name" value={name} onChangeText={setName} />
            <Field label="Net weight (oz)" value={netWeight} onChangeText={setNetWeight} keyboardType="numeric" />

            <Text style={{ color: colors.muted, fontSize: 12, fontWeight: "600", marginTop: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>
                Total macros (whole recipe)
            </Text>

            <Field label="Calories" value={cal} onChangeText={setCal} keyboardType="decimal-pad" />
            <Field label="Protein (g)" value={protein} onChangeText={setProtein} keyboardType="decimal-pad" />
            <Field label="Carbs (g)" value={carbs} onChangeText={setCarbs} keyboardType="decimal-pad" />
            <Field label="Fat (g)" value={fat} onChangeText={setFat} keyboardType="decimal-pad" />

            <Pressable
                onPress={onSave}
                style={{ padding: 14, borderRadius: 12, backgroundColor: colors.accent, marginTop: 6 }}
            >
                <Text style={{ color: colors.background, textAlign: "center", fontWeight: "700", fontSize: 15 }}>
                    Save Recipe
                </Text>
            </Pressable>
        </ScrollView>
    );
}

function Field(props: any) {
    return (
        <View style={{ gap: 6 }}>
            <Text style={{ color: colors.muted, fontSize: 13 }}>{props.label}</Text>
            <TextInput
                {...props}
                returnKeyType="done"
                placeholder={props.label}
                placeholderTextColor={colors.muted}
                style={{ color: colors.text, padding: 12, backgroundColor: colors.surface, borderRadius: 10, fontSize: 15 }}
            />
        </View>
    );
}
