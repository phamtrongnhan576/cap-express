import "dotenv/config";
import { Secret } from "jsonwebtoken";

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

export const APP = {
    PORT: parseInt(getEnvVar("PORT", false)) || 3000,
};
