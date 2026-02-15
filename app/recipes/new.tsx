// create a new recipe

import React from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { styles } from "@/lib/style";

export default function NewRecipeScreen() {

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

    function onSave() {
        if(!validateFields()) return;

        Alert.alert("Save pressed", `Name: ${name}`);
    }

    const validateFields = () => {
        if (name.trim() === "") {
            Alert.alert("ERROR", "Name is required");
            return false;
        }

        for (const field of fields) {
            const num = Number(field.value.trim());

            console.log(`num : ${num}`);

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
        <View style={[styles.container]}>
            <Text style={[styles.text, { fontSize: 20, fontWeight: "600", marginVertical: 10 }]}>Create Recipe</Text>

            <Field label="Recipe name" value={name} onChangeText={setName} />
            <Field label="Net weight (oz)" value={netWeight} onChangeText={setNetWeight} keyboardType="numeric" />

            <Text style={[styles.text, { marginTop: 16, marginBottom: 8, fontWeight: "600" }]}> Total macros (whole recipe)</Text>

            <Field label="Calories" value={cal} onChangeText={setCal} keyboardType="decimal-pad" />
            <Field label="Protein (g)" value={protein} onChangeText={setProtein} keyboardType="decimal-pad" />
            <Field label="Carbs (g)" value={carbs} onChangeText={setCarbs} keyboardType="decimal-pad" />
            <Field label="Fat (g)" value={fat} onChangeText={setFat} keyboardType="decimal-pad" />

            <Pressable
                onPress={onSave}
                style={{ padding: 14, borderWidth: 1, borderRadius: 12, marginTop: 8 }}
            >
                <Text style={[styles.text, { textAlign: "center", fontWeight: "600" }]}>Save Recipe</Text>
            </Pressable>

        </View>
    );
}

function Field(props: any) {
    return (
        <View style={{ gap: 6 }}>
            <Text style={styles.text}>{props.label}</Text>
            <TextInput
                {...props}
                returnKeyType="done"

                placeholder={props.label}
                style={[styles.text, { padding: 12, borderWidth: 1, borderRadius: 10 }]}
            />
        </View>
    );
}

function toNum(s: string) {
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
}