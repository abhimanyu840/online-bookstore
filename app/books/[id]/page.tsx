'use client'
// src/app/books/[id]/page.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BookDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/books/${id}`)
                .then((res) => res.json())
                .then((data) => setBook(data));
        }
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
        </div>
    );
};

export default BookDetails;
