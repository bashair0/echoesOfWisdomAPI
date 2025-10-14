import { Router } from "express";
import { getAllPosts } from "../controllers/postsController.ts";
const postRouter = Router();

postRouter.get("/", getAllPosts);
export { postRouter };
