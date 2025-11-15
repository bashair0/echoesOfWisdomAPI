DROP TABLE "content" CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "imageUrl" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "body" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "translation" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "useCases" text[];--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "similarIdioms" text[];--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "conclusion" text NOT NULL;