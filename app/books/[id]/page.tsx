'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { addItem } from '@/lib/store/features/cart/cartSlice';

interface BookData {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    author: string;
}

const BookDetails = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const [book, setBook] = useState<any>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            fetch(`/api/books/${id}`)
                .then((res) => res.json())
                .then((data) => setBook(data));
        }
    }, [id]);

    const handleAddToCart = (book: BookData) => {
        dispatch(addItem({ ...book, quantity: 1 }));
    }


    if (!book) return <div>Loading...</div>;

    return (
        <div className='container p-2'>
            <section className="text-gray-600 dark:text-gray-400 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image src={book.image} width={500} height={500} priority alt='book-img' />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 dark:text-gray-400 tracking-widest">{book.author}</h2>
                            <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">{book.title}</h1>
                            <p className="leading-relaxed">{book.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 dark:border-gray-700 mb-5"></div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">${book.price}</span>
                                <Button variant={'blue'} onClick={() => handleAddToCart(book)}>Add To Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookDetails;
