// src/components/BookList.tsx
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { toast } from 'react-toastify';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBookData = async () => {
        try {
            setLoading(true);
            let data = await fetch('/api/books');
            let books = await data.json();
            setBooks(books);
            setLoading(false);
        } catch (error) {
            toast.error('Error Fetching Books')
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookData();
    }, []);

    if (!loading && books.length === 0) {
        return <div>No books available</div>;
    }

    if (loading) {
        return <div className='text-center mt-5'>Loading...</div>
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
