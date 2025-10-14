import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers.ts";
import { PostTable } from "./post.ts";
import { relations } from "drizzle-orm";

export const PostViewsTable = pgTable("post_views", {
  id,
  postId: uuid()
    .notNull()
    .references(() => PostTable.id, { onDelete: "cascade" }),
  viewCount: integer().default(0),
  likeCount: integer().default(0),
});

export const PostViewsRelations = relations(PostViewsTable, ({ one }) => ({
  post: one(PostTable, {
    fields: [PostViewsTable.postId],
    references: [PostTable.id],
  }),
}));
