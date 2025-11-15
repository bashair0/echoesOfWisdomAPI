import type { Request, Response } from "express";
import { db } from "../drizzle/db.ts";
import { CategoryTable } from "../drizzle/schema.ts";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await db.select().from(CategoryTable);
    console.log(categories);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNewCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newCategory = await db
      .insert(CategoryTable)
      .values({
        name,
      })
      .returning();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createNewCategory, getAllCategories };
