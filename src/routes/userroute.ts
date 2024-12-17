import express, {Router} from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/usercontroller';
const userRouter = Router();

userRouter.post("/create", createUser)
userRouter.get("/xog/:id", getUser)
userRouter.patch("/update/:id", updateUser)
userRouter.delete("/delete/:id", deleteUser)
userRouter.get("/", getAllUsers)

export default userRouter;