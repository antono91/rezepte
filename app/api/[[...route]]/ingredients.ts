import { Hono } from "hono";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzle";
import { ingredients, insertRecipesIngredientsSchema, RecipesIngredients, units } from "@/db/schema";



const app = new Hono()
  .get(
    "/:id",
    zValidator("param", z.object({
      id: z.string().optional(),
    })),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({error: "Missing id"}, 400)
      }

      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401)
      }

      const data = await db.select({
        id: RecipesIngredients.id,
        recipeId: RecipesIngredients.recipe_id,
        ingredientId: RecipesIngredients.ingredient_id,
        ingredient: ingredients.ingredient,
        unitId: RecipesIngredients.unit_id,
        unit: units.unit,
        amount: RecipesIngredients.amount,
      })
      .from(RecipesIngredients)
      .innerJoin(ingredients, eq(RecipesIngredients.ingredient_id, ingredients.id))
      .innerJoin(units, eq(RecipesIngredients.unit_id, units.id))
      .where(eq(RecipesIngredients.recipe_id, id));

      if (data.length <= 0) {
        return c.json({error: "Not found"}, 404)
      }
  
    return c.json({ data });
  })
  .get(
    "/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401)
      }

      const data = await db
      .select({
        id: ingredients.id,
        value: ingredients.ingredient,
      })
      .from(ingredients)
      
      if (data.length <= 0) {
        return c.json({error: "Not found"}, 404)
      }

    return c.json({data})
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertRecipesIngredientsSchema.omit({
      id:true,
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      console.log(values)

      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401);
      }

      const data = await db.insert(RecipesIngredients).values({
        id: createId(),
        ...values
      }).returning();
      
      return c.json({data});
  });

  export default app;