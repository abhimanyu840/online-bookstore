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

    try {
        const res = OrderSchema.safeParse(body);
        if (!res.success) {
            return NextResponse.json({ error: res.error.format() }, { status: 400 });
        }
        const newOrder = new Order(res.data);
        await newOrder.save();
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
