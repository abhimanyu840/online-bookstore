import { z } from "zod";

const UserRole = ['user', 'admin'] as const;

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, 'Name must be less than 50 characters'),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters").max(50, 'Password must be less than 50 characters'),
    role: z.enum(UserRole).default("user")
})