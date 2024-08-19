import { relations } from "drizzle-orm";
import {createInsertSchema} from "drizzle-zod";
import { pgTable, text, numeric, varchar } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: text("id").primaryKey(),
  author: text("user_id").notNull(),
  name: text("name").notNull(),
  method: varchar("method", {length: 512}),
  img: text("img_url").notNull().default("https://placehold.co/600x400/png?text=No+Image"),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
  RecipesIngredients: many(RecipesIngredients),
}) );

export const insertRecipeSchema = createInsertSchema(recipes);

export const ingredients = pgTable("ingredients", {
  id: text("id").primaryKey(),
  ingredient: text("ingredient").notNull().unique(),
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  RecipesIngredients: many(RecipesIngredients),
}) );

export const units = pgTable("unit", {
  id: text("id").primaryKey(),
  unit: text("unit").notNull().unique(),
})

export const unitsRelations = relations(units, ({ many }) => ({
  RecipesIngredients: many(RecipesIngredients),
}) );

export const RecipesIngredients = pgTable("recipe_ingredient", {
  id: text("id").primaryKey(),
  recipe_id: text("recipe_id").notNull().references(() => recipes.id, {
    onDelete: "cascade"
  }),
  ingredient_id: text("ingredient_id").notNull().references(() => ingredients.id, {
    onDelete: "cascade"
  }),
  unit_id: text("unit_id").notNull().references(() => units.id, {
    onDelete: "set null"
  }),
  amount: numeric("amount", {precision: 6, scale: 2}).notNull(),
});

export const recipesIngredientsRelations = relations(RecipesIngredients, ({ one }) => ({
  recipes: one(recipes, {
    fields: [RecipesIngredients.recipe_id],
    references: [recipes.id],
  }),
  ingredients: one(ingredients, {
    fields: [RecipesIngredients.ingredient_id],
    references: [ingredients.id],
  }),
  units: one(units, {
    fields: [RecipesIngredients.unit_id],
    references: [units.id],
  }),
}) );

export const insertRecipesIngredientsSchema = createInsertSchema(RecipesIngredients);


