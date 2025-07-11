// routes/saved-image.router.ts
import { Router } from "express";
import { authenticateToken } from "@/common/middlewares/auth.middleware";
import savedImageController from "@/controllers/saved-image.controller";

const savedImageRouter = Router();

savedImageRouter.post(
    "/:imageId",
    authenticateToken,
    savedImageController.save
);
savedImageRouter.delete(
    "/:imageId",
    authenticateToken,
    savedImageController.unSave
);
savedImageRouter.get(
    "/:imageId/check",
    authenticateToken,
    savedImageController.checkSaved
);
savedImageRouter.get(
    "/user/saved",
    authenticateToken,
    savedImageController.UserSaved
);

export default savedImageRouter;
