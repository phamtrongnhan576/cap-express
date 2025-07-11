import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { BadrequestException } from "../helpers/exception.helper";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pinterest-app",
        allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
        transformation: [
            { width: 1200, height: 800, crop: "limit", quality: "auto" },
        ],
    } as any,
});

export const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new BadrequestException("Chỉ cho phép upload file ảnh!"), false);
        }
    },
});
