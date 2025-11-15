import { Router } from "express";
import { createNewPost, getAllPosts } from "../controllers/postController.ts";
const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/", createNewPost);
export { postRouter };
