import { NextResponse } from 'next/server';
import razorpayInstance from '@/lib/razorpay';

export async function POST(request: Request) {
    const body = await request.json();
    const { amount } = body;

    const options = {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_order_${new Date().getTime()}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error(error,'error')
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
