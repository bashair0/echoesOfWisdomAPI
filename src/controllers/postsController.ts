import type { Request, Response } from "express";
import { db } from "../drizzle/db.ts";
import { PostTable } from "../drizzle/schema.ts";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.select().from(PostTable);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { getAllPosts };
