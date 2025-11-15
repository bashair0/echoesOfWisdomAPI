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

const createNewPost = async (req: Request, res: Response) => {
  try {
    const { userId, title, slug, imageUrl, body, translation, useCases, similarIdioms, conclusion, status } = req.body;

    const newPost = await db
      .insert(PostTable)
      .values({
        userId,
        title,
        slug,
        imageUrl: imageUrl ?? null,
        body,
        translation: translation ?? null,
        useCases: useCases ?? null,
        similarIdioms: similarIdioms ?? null,
        conclusion: conclusion ?? null,
        status,
      })
      .returning();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { createNewPost, getAllPosts };

