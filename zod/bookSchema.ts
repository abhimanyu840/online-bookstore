import { z } from "zod";

export const bookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.string().url({ message: "Image must be a valid URL" }),
});
