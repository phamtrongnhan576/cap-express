import { Router } from "express";
import imageController from "@/controllers/image.controller";
import { authenticateToken } from "@/common/middlewares/auth.middleware";

const imageRouter = Router();

imageRouter.get("/", imageController.getAll);
imageRouter.get("/search", imageController.search);
imageRouter.get("/:id", imageController.getById);
imageRouter.post("/", authenticateToken, imageController.create);
imageRouter.delete("/:id", authenticateToken, imageController.delete);
imageRouter.get("/user/images", authenticateToken, imageController.getByUser);

export default imageRouter;
