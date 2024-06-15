'use client'
// src/app/books/page.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book: any) => (
          <li key={book._id}>
            <Link href={`/books/${book._id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;

