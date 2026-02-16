import * as SQLite from "expo-sqlite";
import { CREATE_TABLES_SQL, SCHEMA_VERSION } from "./schema";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDb() {
    if (!dbPromise) {
        dbPromise = SQLite.openDatabaseAsync("probable-wabble.db");
    }
    return dbPromise;
}

export async function initDb() {
    const db = await getDb();

    // Create tables and indexes
    await db.execAsync(CREATE_TABLES_SQL);

    // Save schema version (helps with future migrations)
    await db.runAsync(
        `INSERT INTO meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value=excluded.value;`,
        [String(SCHEMA_VERSION)]
    );

    return db;
}

// ----- Types (these describe rows returned from SQLite) -----
export type RecipeRow = {
    id: number;
    name: string;
    net_weight_g: number;
    total_calories: number;
    total_protein_g: number;
    total_carbs_g: number;
    total_fat_g: number;
    created_at: string;
};

export type RecipeInput = Omit<RecipeRow, "id" | "created_at">;

// ----- Recipe functions -----
export async function listRecipes() {
    const db = await getDb();

    return await db.getAllAsync<RecipeRow>(
        `SELECT * FROM recipes ORDER BY created_at DESC;`
    );
}

export async function createRecipe(input: RecipeInput) {
    const db = await getDb();

    const result = await db.runAsync(
        `INSERT INTO recipes
        (name, net_weight_g, total_calories, total_protein_g, total_carbs_g, total_fat_g)
        VALUES (?, ?, ?, ?, ?, ?);`,
        [
            input.name.trim(),
            input.net_weight_g,
            input.total_calories,
            input.total_protein_g,
            input.total_carbs_g,
            input.total_fat_g,
        ]
    );

    // lastInsertRowId is returned by expo-sqlite for inserts
    return Number((result as any).lastInsertRodId ?? 0);
}