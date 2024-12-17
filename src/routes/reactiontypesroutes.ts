import { Router } from "express";
import { createReactionType, deleteReactionType, getAllReactionTypes, getReactionTypeById, updateReactionType } from "../controllers/reactiontypescontroller";
const reactionTypesRouter = Router();

reactionTypesRouter.get("/", getAllReactionTypes);
reactionTypesRouter.post("/create", createReactionType);
reactionTypesRouter.get("/xog/:id", getReactionTypeById);
reactionTypesRouter.patch("/update/:id", updateReactionType);
reactionTypesRouter.delete("/delete/:id", deleteReactionType);
export default reactionTypesRouter;