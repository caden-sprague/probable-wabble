// remembers your list of recipes
// can add a recipe
// can load recipes from the database
// later can log food and load today’s logs

import { create } from "zustand";
import { initDb, listRecipes, createRecipe, deleteRecipe, addFoodLog, listFoodLog, type RecipeRow, type FoodLogRow, type FoodLogInput } from "./db";

/**
 * This is the "shape" of what the store remembers and what it can do.
 */
type RecipeInput = {
    name: string;
    net_weight_g: number;
    total_calories: number;
    total_protein_g: number;
    total_carbs_g: number;
    total_fat_g: number;
};

type State = {
    // data
    ready: boolean;
    recipes: RecipeRow[];
    logs: FoodLogRow[];

    // actions
    bootstrap: () => Promise<void>;
    refreshRecipes: () => Promise<void>;
    addRecipe: (input: RecipeInput) => Promise<number>;
    deleteRecipe: (id: number) => Promise<void>;
    refreshLogs: (date: string) => Promise<void>;
    addLog: (input: FoodLogInput) => Promise<void>;
}

export const useAppStore = create<State>((set, get) => ({
    ready: false,
    recipes: [],
    logs: [],

    bootstrap: async () => {
        await initDb();
        await get().refreshRecipes();
        set({ ready: true });
    },

    refreshRecipes: async () => {
        const recipes = await listRecipes();
        set({ recipes });
    },

    addRecipe: async (input) => {
        const id = await createRecipe(input);
        await get().refreshRecipes();
        return id;
    },

    deleteRecipe: async (id) => {
        await deleteRecipe(id);
        const today = new Date().toISOString().slice(0, 10);
        await Promise.all([get().refreshRecipes(), get().refreshLogs(today)]);
    },

    refreshLogs: async (date) => {
        const logs = await listFoodLog(date);
        set({ logs });
    },

    addLog: async (input) => {
        await addFoodLog(input);
        const today = new Date().toISOString().slice(0, 10);
        await get().refreshLogs(today);
    },
}));