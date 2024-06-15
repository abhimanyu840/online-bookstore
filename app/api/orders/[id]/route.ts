import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import Order from '../../../../models/Order';
import { OrderSchema } from '@/zod/orderSchema';

interface MyRequest extends Request {
    params: {
        id: string;
    }
}

// Get order by ID
export async function GET(request: MyRequest) {
    await dbConnect();
    const { id } = request.params;
    const order = await Order.findById(id).populate('user').populate('orderItems.book');
    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
}

// Update order by ID
export async function PUT(request: MyRequest) {
    await dbConnect();
    const { id } = request.params;
    const body = await request.json();

    // Validate request body against Zod schema
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

// Delete order by ID
export async function DELETE(request: MyRequest) {
    await dbConnect();
    const { id } = request.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order deleted' });
}
