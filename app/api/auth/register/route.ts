import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { registerUser } from '../../../../utils/auth';
import { registerSchema } from '@/zod/registerSchema';

export async function POST(request: NextRequest) {
    await dbConnect();

    const res = registerSchema.safeParse(await request.json());
    if (!res.success) {
        return NextResponse.json({ message: 'Invalid request', errors: res.error.issues },)
    }
    try {
        const result = await registerUser({ ...res.data });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
