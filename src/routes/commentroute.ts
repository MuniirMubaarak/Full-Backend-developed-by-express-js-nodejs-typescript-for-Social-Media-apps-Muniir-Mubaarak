import express, { Router } from 'express';
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from '../controllers/commentController';
const commentsRouter = Router();

commentsRouter.get("/", getAllComments);
commentsRouter.post("/create", createComment);
commentsRouter.get("/xog/:id", getCommentById);
commentsRouter.delete("/delete/:id", deleteComment);
commentsRouter.patch("/update/:id", updateComment)
export default commentsRouter;