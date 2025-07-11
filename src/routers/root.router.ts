// routes/index.ts
import { Router } from "express";
import authRouter from "./auth.router";
import imageRouter from "./image.router";
import savedImageRouter from "./saved-image.router";
import commentRouter from "./comment.router";
import userRouter from "./user.router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/images", imageRouter);
rootRouter.use("/saved-images", savedImageRouter);
rootRouter.use("/comments", commentRouter);
rootRouter.use("/users", userRouter);

export default rootRouter;
