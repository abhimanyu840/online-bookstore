import { z } from 'zod';

// Define the Zod schema for the order item
const OrderItemSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    image: z.string(),
    price: z.number(),
    book: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid book ID'), // Assuming ObjectId is 24 hex characters
});

// Define the Zod schema for the shipping address
const ShippingAddressSchema = z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

// Define the Zod schema for the payment result
const PaymentResultSchema = z.object({
    id: z.string().optional(),
    status: z.string().optional(),
    update_time: z.string().optional(),
    email_address: z.string().optional(),
});

// Define the Zod schema for the order
const OrderSchema = z.object({
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'), // Assuming ObjectId is 24 hex characters
    orderItems: z.array(OrderItemSchema),
    shippingAddress: ShippingAddressSchema,
    paymentMethod: z.string(),
    paymentResult: PaymentResultSchema.optional(),
    taxPrice: z.number(),
    shippingPrice: z.number(),
    totalPrice: z.number(),
    isPaid: z.boolean().default(false),
    paidAt: z.date().optional(),
    isDelivered: z.boolean().default(false),
    deliveredAt: z.date().optional(),
});

// Export the OrderSchema
export { OrderSchema };
