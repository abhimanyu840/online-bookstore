'use client'

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import OrderCard from './OrderCard';

const OrdersList = () => {

    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);

    const fetchOrders = async () => {
        if (!user) return;

        try {
            const response = await fetch(`/api/orders/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            toast.error('Error fetching orders');
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user?.id]);

    if (orders.length === 0) {
        return <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Orders
            </h1><div className='text-center mt-4'>No Orders</div></div>
    }

    return (
        <div>
            {orders.map(order => (
                <OrderCard
                    key={order._id}
                    author={order.orderItems[0]?.book.author}
                    image={order.orderItems[0]?.book.image}
                    price={order.totalPrice}
                    quantity={order.orderItems.length}
                    title={order.orderItems[0]?.book.title}
                />
            ))}
        </div>
    )
}

export default OrdersList
