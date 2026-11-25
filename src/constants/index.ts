import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

export const ROLE_OPTIONS = [
    {
        value: USER_ROLES.STUDENT,
        label: "Student",
        icon: GraduationCap,
    },
    {
        value: USER_ROLES.TEACHER,
        label: "Teacher",
        icon: School,
    },
];

export const DEPARTMENTS = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Economics",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Sociology",
    "Political Science",
    "Philosophy",
    "Education",
    "Fine Arts",
    "Music",
    "Physical Education",
    "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept,
}));



export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

import * as z from "zod";

const envSchema = z.object({
    VITE_API_URL: z.string().url("VITE_API_URL must be a valid URL"),
    VITE_BACKEND_BASE_URL: z.string().url("VITE_BACKEND_BASE_URL must be a valid URL"),
    VITE_CLOUDINARY_UPLOAD_URL: z.string().url("VITE_CLOUDINARY_UPLOAD_URL must be a valid URL"),
    VITE_CLOUDINARY_CLOUD_NAME: z.string().min(1, "VITE_CLOUDINARY_CLOUD_NAME is required"),
    VITE_CLOUDINARY_UPLOAD_PRESET: z.string().min(1, "VITE_CLOUDINARY_UPLOAD_PRESET is required"),
    VITE_ACCESS_TOKEN_KEY: z.string().min(1, "VITE_ACCESS_TOKEN_KEY is required"),
    VITE_REFRESH_TOKEN_KEY: z.string().min(1, "VITE_REFRESH_TOKEN_KEY is required"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
    const issues = parsed.error.issues
        .map((i) => `- ${i.path.join(".")}: ${i.message}`)
        .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
}

export const CLOUDINARY_UPLOAD_URL = parsed.data.VITE_CLOUDINARY_UPLOAD_URL;
export const CLOUDINARY_CLOUD_NAME = parsed.data.VITE_CLOUDINARY_CLOUD_NAME;
export const BACKEND_BASE_URL = parsed.data.VITE_BACKEND_BASE_URL;

export const BASE_URL = parsed.data.VITE_API_URL;
export const ACCESS_TOKEN_KEY = parsed.data.VITE_ACCESS_TOKEN_KEY;
export const REFRESH_TOKEN_KEY = parsed.data.VITE_REFRESH_TOKEN_KEY;

export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET = parsed.data.VITE_CLOUDINARY_UPLOAD_PRESET;