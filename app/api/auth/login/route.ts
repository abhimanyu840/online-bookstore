import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { loginUser } from '../../../../utils/auth';

export async function POST(request: Request) {
    await dbConnect();
    const { email, password } = await request.json();

    try {
        const result = await loginUser(email, password);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
