'use client'
import React from 'react'
import { Button } from './ui/button'
import { useAppDispatch } from '@/lib/store/hooks';
import { CardData } from './Card';
import { addItem } from '@/lib/store/features/cart/cartSlice';

const AddToCartBtn = ({ id, title, description, image, price, author }: CardData) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addItem({ id, title, description, image, price, quantity: 1 }));
    }
    return (
        <Button variant={'blue'} onClick={handleAddToCart}>Add To Cart</Button>
    )
}

export default AddToCartBtn
