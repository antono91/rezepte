CREATE TABLE IF NOT EXISTS "recipe_ingredient" (
	"id" text PRIMARY KEY NOT NULL,
	"recipe_id" text NOT NULL,
	"ingredient_id" text NOT NULL,
	"unit_id" text NOT NULL,
	"amount" numeric(6, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" text PRIMARY KEY NOT NULL,
	"ingredient" text NOT NULL,
	CONSTRAINT "ingredients_ingredient_unique" UNIQUE("ingredient")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"method" text[],
	"img_url" text DEFAULT 'https://placehold.co/600x400/png?text=No+Image' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unit" (
	"id" text PRIMARY KEY NOT NULL,
	"unit" text NOT NULL,
	CONSTRAINT "unit_unit_unique" UNIQUE("unit")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_unit_id_unit_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."unit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
