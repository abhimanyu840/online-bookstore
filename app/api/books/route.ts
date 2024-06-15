// src/app/api/books/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import Book from '@/models/Book';
import { bookSchema } from '@/zod/bookSchema';

export async function GET() {
  await dbConnect();
  const books = await Book.find();
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  await dbConnect();
  const bookDetail = await request.json();
  const res = bookSchema.safeParse(bookDetail);
  if (!res.success) {
    return NextResponse.json({ error: res.error.message });
  }
  const newBook = new Book({ ...res.data });
  await newBook.save();
  return NextResponse.json(newBook, { status: 201 });
}

