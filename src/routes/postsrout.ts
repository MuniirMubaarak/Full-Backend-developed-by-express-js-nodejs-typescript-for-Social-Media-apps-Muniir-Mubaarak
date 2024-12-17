import exp from 'constants';
import express, {Router} from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePosts } from '../controllers/postscontroller';
const postsRouter = Router();

postsRouter.get("/", getAllPosts )
postsRouter.post("/create", createPost)
postsRouter.put("/update/:id", updatePosts)
postsRouter.get("/xog/:id", getSinglePost)
postsRouter.delete("/delete/:id", deletePost)
export default postsRouter
