import { z } from "zod";


export const bookSchema = z.object({
    title: z.string().min(3, { message: 'Title of three characters are must' }),
    author: z.string().min(3, { message: 'Author name of three characters are must' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    description: z.string().optional(),
    image: z.string().optional(),
})
