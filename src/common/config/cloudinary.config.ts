// common/config/cloudinary.config.ts
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { BadrequestException } from "@/common/helpers/exception.helper";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pinterest-app",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [
            {
                width: 1200,
                height: 800,
                crop: "limit",
                quality: "auto",
            },
        ],
    } as any,
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new BadrequestException("Chỉ chấp nhận file hình ảnh!"), false);
        }
    },
});

export { cloudinary, upload };
