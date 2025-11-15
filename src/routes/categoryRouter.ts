import { Router } from "express";
import { createNewCategory, getAllCategories } from "../controllers/categoryController.ts";
const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", createNewCategory);
export { categoryRouter };
