import { Hono } from "hono";
import { handle } from "hono/vercel";

import recipes from "./recipes";

export const runtime = "edge"

const app = new Hono().basePath("/api");

const routes = app
  .route("/recipes", recipes);

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)


export type AppType = typeof routes;