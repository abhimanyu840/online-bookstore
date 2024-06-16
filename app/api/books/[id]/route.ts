// src/app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Book from '@/models/Book';
import { decodeToken } from '@/utils/auth';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = params;
    const book = await Book.findById(id);
    if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const token = request.headers.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await decodeToken(token) as JwtPayload;
    if (!(decodedToken.role === 'admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = params;
    const { title, author, price, description, image } = await request.json();
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, description, image }, { new: true });
    if (!updatedBook) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBook);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const token = request.headers.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await decodeToken(token) as JwtPayload;
    if (!(decodedToken.role === 'admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Book deleted' });
}
