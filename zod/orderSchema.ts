import { z } from 'zod';

export const OrderSchema = z.object({
    user: z.string(),
    orderItems: z.array(z.object({
        book: z.string(),
        quantity: z.number(),
    })),
    paymentInfo: z.object({
        id: z.string(),
        status: z.string(),
    }),
    totalPrice: z.number(),
    isPaid: z.boolean(),
    paidAt: z.date().optional(),
});
