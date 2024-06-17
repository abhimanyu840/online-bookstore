// components/Cart.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { getLoginState } from '@/utils/getLoginState';
import { useAuth } from '@/app/context/AuthContext';

interface CartProps {
    cartItems: any[];
    onClose: () => void;
}

const Cart = ({ cartItems, onClose }: CartProps) => {

    const [hydrated, setHydrated] = useState(false);
    const { loggedIn } = useAuth();

    useEffect(() => {
        setHydrated(true);
    }, [])


    // const checkLoggedIn = async () => {
    //     const { token } = await getLoginState();
    //     if (token) {
    //         setLoggedIn(true);
    //     }
    // };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (hydrated && <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
        <div className="w-full max-w-md h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold dark:text-white">Shopping Cart</h2>
                <button title='onclose' onClick={onClose}>
                    <XIcon className="w-6 h-6 dark:text-white" />
                </button>
            </div>
            {cartItems.length === 0 ? (
                <p className="dark:text-gray-400">Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <h3 className="text-lg dark:text-white">{item.title}</h3>
                                        <p className="dark:text-gray-400">₹{item.price}</p>
                                        <div className="flex gap-4 mt-0 5 items-center">
                                            <Button size="sm" variant="outline" color="primary">-</Button>
                                            <span className="text-lg">{item.quantity}</span>
                                            <Button size="sm" variant="outline" color="primary">+</Button>
                                        </div>
                                    </div>
                                </div>
                                <p className="dark:text-white">₹{item.price * item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-semibold dark:text-white">Total: ₹{totalPrice}</h3>
                        <Button variant={'blue'} disabled={!loggedIn} >Checkout</Button>
                        {!loggedIn && <p className="text-sm">Please Login To checkout</p>}
                    </div>
                </>
            )}
        </div>
    </div>
    );
};

export default Cart;
