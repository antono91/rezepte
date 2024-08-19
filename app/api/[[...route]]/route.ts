import { Hono } from "hono";
import { handle } from "hono/vercel";

import recipes from "./recipes";
import ingredients from "./ingredients";

export const runtime = "edge"

const app = new Hono().basePath("/api");

const routes = app
  .route("/recipes", recipes)
  .route("/ingredients", ingredients);

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)


export type AppType = typeof routes;