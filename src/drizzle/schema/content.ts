import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers.ts";
import { PostTable } from "./post.ts";
import { relations } from "drizzle-orm";

export const contentTable = pgTable("content", {
  id,
  postId: uuid()
    .notNull()
    .references(() => PostTable.id, { onDelete: "cascade" }),
  imageUrl: text(),
  body: text().notNull(),
  translation: text(),
  useCases: text().array(),
  similarIdioms: text().array(),
  conclusion: text().notNull(),
});

export const ContentRelations = relations(contentTable, ({ one }) => ({
  post: one(PostTable, {
    fields: [contentTable.postId],
    references: [PostTable.id],
  }),
}));
