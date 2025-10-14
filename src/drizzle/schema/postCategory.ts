import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { PostTable } from "./post.ts";
import { CategoryTable } from "./category.ts";
import { relations } from "drizzle-orm";

export const PostCategoryTable = pgTable(
  "post_categories",
  {
    postId: uuid()
      .notNull()
      .references(() => PostTable.id, { onDelete: "cascade" }),
    categoryId: uuid()
      .notNull()
      .references(() => CategoryTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.postId, table.categoryId] })]
);

export const PostCategoryRelations = relations(
  PostCategoryTable,
  ({ one }) => ({
    post: one(PostTable, {
      fields: [PostCategoryTable.postId],
      references: [PostTable.id],
    }),
    category: one(CategoryTable, {
      fields: [PostCategoryTable.categoryId],
      references: [CategoryTable.id],
    }),
  })
);
