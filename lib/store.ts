// remembers your list of recipes
// can add a recipe
// can load recipes from the database
// later can log food and load today’s logs

import { create } from "zustand";
import { initDb, listRecipes, createRecipe, type RecipeRow } from "./db";

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

    // actions
    bootstrap: () => Promise<void>;
    refreshRecipes: () => Promise<void>;
    addRecipe: (input: RecipeInput) => Promise<number>;
}

export const useAppStore = create<State>((set, get) => ({
    ready: false,
    recipes: [],

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
    }
}));