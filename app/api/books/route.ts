// src/app/api/books/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import Book from '@/models/Book';
import { bookSchema } from '@/zod/bookSchema';
import { decodeToken } from '@/utils/auth';

export async function GET() {
  await dbConnect();
  const books = await Book.find();
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  await dbConnect();
  const token = await request.headers.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 404 });
  }
  else {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 404 });
    }
    console.log(decodedToken, 'decoded token');
  }
  const bookDetail = await request.json();
  const res = bookSchema.safeParse(bookDetail);
  if (!res.success) {
    return NextResponse.json({ error: res.error.message });
  }
  const newBook = new Book({ ...res.data });
  await newBook.save();
  return NextResponse.json(newBook, { status: 201 });
}

