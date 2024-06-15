import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { registerUser } from '../../../../utils/auth';

export async function POST(request: Request) {
    await dbConnect();
    const { name, email, password, role } = await request.json();

    try {
        const result = await registerUser({ name, email, password, role });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
