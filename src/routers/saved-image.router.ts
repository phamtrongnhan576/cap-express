import { Router } from "express";
import { authenticateToken } from "@/common/middlewares/auth.middleware";
import {
    saveImage,
    unsaveImage,
    checkSavedImage,
    getUserSavedImages,
} from "../controllers/saved-image.controller";

const router = Router();

router.post("/images/:imageId/save", authenticateToken, saveImage);
router.delete("/images/:imageId/save", authenticateToken, unsaveImage);
router.get("/images/:imageId/check-saved", authenticateToken, checkSavedImage);
router.get("/user/saved-images", authenticateToken, getUserSavedImages);

export default router;
