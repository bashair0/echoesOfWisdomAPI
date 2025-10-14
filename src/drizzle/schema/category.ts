import { pgTable, text } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers.ts";
import { relations } from "drizzle-orm";
import { PostCategoryTable } from "./postCategory.ts";

export const CategoryTable = pgTable("categories", {
  id,
  name: text().notNull().unique(),
});

export const CategoryRelations = relations(CategoryTable, ({ many }) => ({
  postCategories: many(PostCategoryTable),
}));
