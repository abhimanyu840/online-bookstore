// 'use client';
// src/app/books/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// const BookList = dynamic(() => import('@/components/BookList'), {
//   loading: () => <div className='mt-5 text-2xl font-semibold text-center'>Loading books...</div>
// });
const BookList = dynamic(() => import('@/components/BookListServer'), {
  loading: () => <div className='mt-5 text-2xl font-semibold text-center'>Loading books...</div>
});

const Books = () => {
  return (
    <div className='container'>
      <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
        Books
      </h1>
      <Suspense>
        <BookList />
      </Suspense>
    </div>
  );
};

export default Books;
