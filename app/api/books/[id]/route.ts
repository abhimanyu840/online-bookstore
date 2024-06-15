// src/app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Book from '@/models/Book';

interface MyRequest extends Request {
    params: {
        id: string;
    }
}

export async function GET(request: MyRequest) {
    await dbConnect();
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
}

export async function PUT(request: MyRequest) {
    await dbConnect();
    const { id } = request.params;
    const { title, author, price, description } = await request.json();
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, description }, { new: true });
    if (!updatedBook) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBook);
}

export async function DELETE(request: MyRequest) {
    await dbConnect();
    const { id } = request.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Book deleted' });
}
