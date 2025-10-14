import { pgTable, pgEnum, text } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers.ts";
import { relations } from "drizzle-orm";
import { PostTable } from "./post.ts";
import { commentTable } from "./comment.ts";

export const userRoles = ["admin", "author", "subscriber"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  username: text().notNull(),
  email: text().notNull().unique(),
  role: userRoleEnum().default("subscriber").notNull(),
  imageUrl: text(),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  posts: many(PostTable),
  comments: many(commentTable),
}));
