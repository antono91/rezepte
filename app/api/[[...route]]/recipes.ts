import { Hono } from "hono";
import {z} from "zod"
import { eq } from "drizzle-orm";

import {zValidator} from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { createId } from "@paralleldrive/cuid2";

import { db } from "@/db/drizzle";
import { insertRecipeSchema, recipes } from "@/db/schema";


const app = new Hono()
  .get("/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      
      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401);
      }

    const data = await db
    .select({
      id: recipes.id,
      name: recipes.name,
      method: recipes.method,
      img_url: recipes.img,
    })
    .from(recipes);

    return c.json({ data });
  })
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

      const [data] = await db
        .select({
          id: recipes.id,
          name: recipes.name,
          method: recipes.method,
          img_url: recipes.img,
          author: recipes.author,
        })
        .from(recipes)
        .where(
          eq(recipes.id, id)
        );
      
        if (!data) {
          return c.json({error: "Not found"}, 404)
        }

      return c.json({ data });
    }
  )
  .post("/",
    clerkMiddleware(),
    zValidator("json", insertRecipeSchema.pick({
      name: true,
    })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      
      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401);
      }
      
      const [data] = await db.insert(recipes).values({
        id: createId(),
        author: auth.userId,
        ...values
      }).returning();
      
      return c.json({data});
  })
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator("param", z.object({
      id: z.string().optional(),
    })),
    zValidator(
      "json",
      insertRecipeSchema.omit({
        id:true,
        author: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({error: "Missing id"}, 400)
      }

      if (!auth?.userId){
        return c.json({error: "Unauthorized"}, 401)
      }
      const [data] = await db
      .update(recipes)
      .set(values)
      .where(eq(recipes.id, id))
      .returning();

      if(!data) {
        return c.json({error: "Not found"}, 404)
      }

      return c.json({data})
    });

export default app; 