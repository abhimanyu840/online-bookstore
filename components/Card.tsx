import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/store/hooks';
import { addItem } from '@/lib/store/features/cart/cartSlice';

export interface CardData {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    author: string;
}

const Card = ({ id, title, description, image, price, author }: CardData) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addItem({ id, title, description, image, price, quantity: 1 }));
    }

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-6 px-10 py-6">
            <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                <Image
                    className="object-cover"
                    src={image}
                    layout="fill"
                    alt="product image"
                    priority
                />
            </div>
            <h2 className="tracking-widest text-center mt-0.5 text-xs title-font font-medium text-gray-400 mb-1">{author}</h2>
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ₹{price}
                    </span>
                </div>
                <div className="flex justify-between">
                    <Button variant={'blue'}><Link href={`/books/${id}`}>View Details</Link></Button>
                    <Button variant={'blue'} onClick={handleAddToCart}>Add To Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default Card;
