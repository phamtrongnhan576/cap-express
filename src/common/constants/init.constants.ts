import "dotenv/config";
import { Secret } from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
function getEnvVar(key: string, required = true): string {
    const value = process.env[key];
    if (!value && required) throw new Error(`❌ Missing env var: ${key}`);
    return value!;
}

export const DATABASE_URL = getEnvVar("DATABASE_URL");

export const JWT: { SECRET: Secret; EXPIRES_IN: string } = {
    SECRET: getEnvVar("JWT_SECRET"),
    EXPIRES_IN: getEnvVar("JWT_EXPIRES_IN"),
};

export const CLOUDINARY = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const APP = {
    PORT: parseInt(getEnvVar("PORT", false)) || 3000,
};
