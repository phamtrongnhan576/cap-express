// common/config/cloudinary.config.ts
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { BadrequestException } from "@/common/helpers/exception.helper";
import { CLOUDINARY } from "@/common/constants/init.constants";

const storage = new CloudinaryStorage({
    cloudinary: CLOUDINARY,
    params: {
        folder: "pinterest-app",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [
            {
                width: 1200,
                height: 800,
                crop: "fill",
                gravity: "face",
                quality: "auto:best",
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
            (cb as (error: Error | null, acceptFile: boolean) => void)(
                new BadrequestException("Chỉ chấp nhận file hình ảnh!"),
                false
            );
        }
    },
});

export { CLOUDINARY as cloudinary, upload };
