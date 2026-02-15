export const SCHEMA_VERSION = 1;

export const CREATE_TABLES_SQL = `
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  net_weight_g REAL NOT NULL,
  total_calories REAL NOT NULL,
  total_protein_g REAL NOT NULL,
  total_carbs_g REAL NOT NULL,
  total_fat_g REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS food_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eaten_at TEXT NOT NULL,               -- ISO string
  item_type TEXT NOT NULL,              -- 'recipe' (for now)
  recipe_id INTEGER,
  amount_g REAL NOT NULL,               -- amount eaten in grams
  calories REAL NOT NULL,
  protein_g REAL NOT NULL,
  carbs_g REAL NOT NULL,
  fat_g REAL NOT NULL,
  notes TEXT,
  FOREIGN KEY(recipe_id) REFERENCES recipes(id)
);

CREATE INDEX IF NOT EXISTS idx_food_log_eaten_at ON food_log(eaten_at);
CREATE INDEX IF NOT EXISTS idx_food_log_recipe_id ON food_log(recipe_id);
`;