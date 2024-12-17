import { Router } from 'express';
import { createReaction, deleteReaction, getAllReactions, getReactionById, UpdateReaction } from '../controllers/reactioncontrollers';
const reactionRoutes = Router();
reactionRoutes.get("/", getAllReactions);
reactionRoutes.get("/xog/:id", getReactionById);
reactionRoutes.post("/create", createReaction);
reactionRoutes.patch("/update/:id", UpdateReaction);
reactionRoutes.delete("/delete/:id", deleteReaction)
export default reactionRoutes