import {
  pgEnum,
  pgTable,
  text,
  uuid,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { id, createdAt } from "../schemaHelpers.ts";
import { PostTable } from "./post.ts";
import { UserTable } from "./user.ts";
import { relations } from "drizzle-orm";

export const commentStatus = ["approved", "pending", "spam"] as const;
export type CommentStatus = (typeof commentStatus)[number];
export const commentStatusEnum = pgEnum("comment_status", commentStatus);

export const commentTable = pgTable("comments", {
  id,
  postId: uuid()
    .references(() => PostTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid()
    .references(() => UserTable.id, { onDelete: "set null" })
    .notNull(),
  parentCommentId: uuid().references((): AnyPgColumn => commentTable.id, {
    onDelete: "cascade",
  }),
  commentBody: text().notNull(),
  status: commentStatusEnum().default("pending").notNull(),
  createdAt,
});

export const CommentRelations = relations(commentTable, ({ one, many }) => ({
  post: one(PostTable, {
    fields: [commentTable.postId],
    references: [PostTable.id],
  }),
  user: one(UserTable, {
    fields: [commentTable.userId],
    references: [UserTable.id],
  }),
  parentComment: one(commentTable, {
    fields: [commentTable.parentCommentId],
    references: [commentTable.id],
  }),
}));
