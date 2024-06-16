'use client'
// src/components/Cart.tsx
import React from 'react';
import { XIcon } from 'lucide-react';

interface CartProps {
    cartItems: any[];
    onClose: () => void;
}

const Cart = ({ cartItems, onClose }: CartProps) => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold dark:text-white">Shopping Cart</h2>
                    <button onClick={onClose}>
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
                                            <p className="dark:text-gray-400">₹{item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="dark:text-white">₹{item.price * item.quantity}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-lg font-semibold dark:text-white">Total: ₹{totalPrice}</h3>
                            <button className="mt-4 w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" title='checkout'>Checkout</button>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
