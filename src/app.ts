import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userroute";
import postsRouter from "./routes/postsrout";
import commentsRouter from "./routes/commentroute";
import reactionRoutes from "./routes/reactionroutes";
import reactionTypesRouter from "./routes/reactiontypesroutes";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRouter)
app.use("/api/posts", postsRouter)
app.use("/api/comments", commentsRouter)
app.use("/api/reactions", reactionRoutes)
app.use("/api/reaction_types", reactionTypesRouter)
app.listen(port, ()=> {
    console.log("Asc, The port is " + port)
});
