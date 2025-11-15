import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers.ts";
import { commentTable } from "./comment.ts";
import { PostCategoryTable } from "./postCategory.ts";
import { UserTable } from "./user.ts";

export const status = ["draft", "published"] as const;
export type Status = (typeof status)[number];
export const statusEnum = pgEnum("post_status", status);

export const PostTable = pgTable("posts", {
  id,
  userId: uuid()
    .references(() => UserTable.id, { onDelete: "set null" })
    .notNull(),
  title: text().notNull(),
  slug: text().notNull().unique(),
  imageUrl: text(),
  body: text().notNull(),
  translation: text(),
  useCases: text().array(),
  similarIdioms: text().array(),
  conclusion: text().notNull(),
  status: statusEnum().default("draft").notNull(),
  createdAt,
  updatedAt,
});

export const PostRelations = relations(PostTable, ({ many, one }) => ({
  postCategories: many(PostCategoryTable),
  comments: many(commentTable),
  user: one(UserTable, {
    fields: [PostTable.userId],
    references: [UserTable.id],
  }),
}));
