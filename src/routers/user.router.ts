import { Router } from "express";
import userController from "@/controllers/user.controller";
import { authenticateToken } from "@/common/middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/profile", authenticateToken, userController.getProfile);
userRouter.put("/profile", authenticateToken, userController.updateProfile);
userRouter.get(
    "/saved-images",
    authenticateToken,
    userController.getSavedImages
);
userRouter.get(
    "/created-images",
    authenticateToken,
    userController.getCreatedImages
);
userRouter.get("/stats", authenticateToken, userController.getUserStats);

export default userRouter;
