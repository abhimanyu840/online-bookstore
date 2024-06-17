import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import Order from '../../../../models/Order';
import { OrderSchema } from '@/zod/orderSchema';

// Get order by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const order = await Order.findById(id).populate('user').populate('orderItems.book');
    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
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

// // Delete order by ID
// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     await dbConnect();
//     const { id } = params;
//     const deletedOrder = await Order.findByIdAndDelete(id);
//     if (!deletedOrder) {
//         return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//     }
//     return NextResponse.json({ message: 'Order deleted' });
// }
