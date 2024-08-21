import { db } from "@/db/drizzle";
import { units } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";


const app = new Hono()
  .get(
    "/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401)
      }

      const data = await db
      .select({
        id: units.id,
        value: units.unit,
      })
      .from(units)
      
      if (data.length <= 0) {
        return c.json({error: "Not found"}, 404)
      }

    return c.json({data})
  });

export default app;