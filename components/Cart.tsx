import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { removeItem, updateQuantity, clearCart } from '@/lib/store/features/cart/cartSlice';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

interface CartProps {
    onClose: () => void;
    cartItems: any[]; // Adjust the type according to your cart item structure
}

const Cart = ({ onClose }: CartProps) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const [hydrated, setHydrated] = useState(false);
    const { loggedIn, user } = useAuth()
    const router = useRouter();

    useEffect(() => {
        setHydrated(true);
    }, []);

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const totalPrice = cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/razorpay/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalPrice }),
            });

            if (!response.ok) {
                toast.error('Failed to create Razorpay order');
                throw new Error('Failed to create Razorpay order');
            }

            const data = await response.json();
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: 'INR',
                name: 'Book Store',
                description: 'Test Transaction',
                order_id: data.id,
                handler: async (response: any) => {
                    const paymentData = {
                        user: user && user.id, // Ensure user ID is included
                        orderItems: cartItems.map((item: any) => ({
                            book: item.id,
                            quantity: item.quantity,
                        })),
                        paymentInfo: {
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        },
                        totalPrice,
                        isPaid: true,
                    };

                    const res = await fetch('/api/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(paymentData),
                    });

                    const result = await res.json();
                    if (result) {
                        toast.success('Payment Successful');
                        dispatch(clearCart());
                        router.push('/orders')
                    } else {
                        toast.error('Payment Failed');
                    }
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#61dafb',
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

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
                        {cartItems.map((item: any) => (
                            <li key={item.id} className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <h3 className="text-lg dark:text-white">{item.title}</h3>
                                        <p className="dark:text-gray-400">₹{item.price}</p>
                                        <div className="flex gap-4 mt-0 5 items-center">
                                            <Button size="sm" variant="outline" color="primary" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</Button>
                                            <span className="text-lg">{item.quantity}</span>
                                            <Button size="sm" variant="outline" color="primary" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                                        </div>
                                    </div>
                                </div>
                                <p className="dark:text-white">₹{item.price * item.quantity}</p>
                                <Button variant={'destructive'} onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 border-t pt-4">
                        <h3 className="text-lg font-semibold dark:text-white">Total: ₹{totalPrice}</h3>
                        <Button variant="blue" onClick={handleCheckout} disabled={!loggedIn} >Checkout</Button>
                        {!loggedIn && <p className='text-sm mb-2 text-gray-500'>Please Login to checkout</p>}
                        <Button variant='destructive' onClick={handleClearCart}>Clear Cart</Button>
                    </div>
                </>
            )}
        </div>
    </div>);
};

export default Cart;
