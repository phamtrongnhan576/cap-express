import { Router } from "express";
import authRouter from "./auth.router";
import imageRouter from "./image.router";
import savedImageRouter from "./saved-image.router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/images", imageRouter);
rootRouter.use("/image", savedImageRouter);

export default rootRouter;
