// src/components/BookList.tsx
import { useEffect, useState } from 'react';
import Card from '@/components/Card';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    if (books.length === 0) {
        return <div>No books available</div>;
    }

    return (
        <ul className='flex flex-wrap gap-8 items-center justify-center'>
            {books.map((book: any) => (
                <li key={book._id}>
                    <Card id={book._id} title={book.title} description={book.description} image={book.image} price={book.price} author={book.author} />
                </li>
            ))}
        </ul>
    );
};

export default BookList;
