ALTER TABLE "recipes" ALTER COLUMN "method" SET DATA TYPE varchar(512);--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "method" DROP DEFAULT;