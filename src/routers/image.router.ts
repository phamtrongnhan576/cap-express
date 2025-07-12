import { Router } from "express";
import { authenticateToken } from "@/common/middlewares/auth.middleware";
import { upload } from "@/common/config/cloudinary.config";
import imageController from "@/controllers/image.controller";

const imageRouter = Router();

imageRouter.get("/", imageController.getAll);

imageRouter.get("/search", imageController.search);

imageRouter.get("/:id", imageController.getById);

imageRouter.post(
    "/",
    authenticateToken,
    upload.single("file"),
    imageController.create
);

imageRouter.put(
    "/:id",
    authenticateToken,
    upload.single("file"),
    imageController.edit
);

imageRouter.delete("/:id", authenticateToken, imageController.delete);

imageRouter.get("/user/:userId", authenticateToken, imageController.getUser);

export default imageRouter;
