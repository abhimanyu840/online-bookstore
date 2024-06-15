import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import Order from '../../../models/Order';
import { OrderSchema } from '@/zod/orderSchema';

// Get all orders
export async function GET() {
    await dbConnect();
    const orders = await Order.find().populate('user').populate('orderItems.book');
    return NextResponse.json(orders);
}

// Create a new order
export async function POST(request: Request) {
    await dbConnect();
    const body = await request.json();

    // Validate request body against Zod schema
    try {
        OrderSchema.parse(body);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }

    const newOrder = new Order(body);
    await newOrder.save();
    return NextResponse.json(newOrder, { status: 201 });
}
