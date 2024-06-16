'use client';
// src/app/books/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const BookList = dynamic(() => import('@/components/BookList'), {
  suspense: true,
});

const Books = () => {
  return (
    <div className='container'>
      <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
        Books
      </h1>
      <Suspense fallback={<div>Loading books...</div>}>
        <BookList />
      </Suspense>
    </div>
  );
};

export default Books;
