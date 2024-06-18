import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import Order from '../../../../models/Order';
import { OrderSchema } from '@/zod/orderSchema';

// // Get order by ID
// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//     await dbConnect();
//     const { id } = params;
//     const order = await Order.find({ user: id }).populate('user', 'name email');
//     if (!order) {
//         return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//     }
//     return NextResponse.json(order);
// }

// Get orders by user ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const orders = await Order.find({ user: id }).populate('user', 'name email').populate('orderItems.book');
    if (!orders || orders.length === 0) {
        return NextResponse.json({ error: 'No orders found for this user' }, { status: 404 });
    }
    return NextResponse.json(orders);
}

// Update order by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    try {
        OrderSchema.partial().parse(body); // Allow partial updates
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });
    if (!updatedOrder) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(updatedOrder);
}
