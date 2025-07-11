// routes/comment.router.ts
import { Router } from "express";
import commentController from "@/controllers/comment.controller";
import { authenticateToken } from "@/common/middlewares/auth.middleware";

const commentRouter = Router();

commentRouter.get("/image/:imageId", commentController.getByImageId);
commentRouter.post("/", authenticateToken, commentController.create);
commentRouter.delete("/:id", authenticateToken, commentController.delete);
commentRouter.put("/:id", authenticateToken, commentController.update);

export default commentRouter;
