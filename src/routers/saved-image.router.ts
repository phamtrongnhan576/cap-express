import { Router } from "express";
import { authenticateToken } from "@/common/middlewares/auth.middleware";
import savedImageController from "@/controllers/saved-image.controller";

const savedImageRouter = Router();

savedImageRouter.post("/:id", authenticateToken, savedImageController.save);
savedImageRouter.delete("/:id", authenticateToken, savedImageController.unSave);
savedImageRouter.get(
    "/:id",
    authenticateToken,
    savedImageController.checkSaved
);
savedImageRouter.get(
    "/user",
    authenticateToken,
    savedImageController.UserSaved
);

export default savedImageRouter;
