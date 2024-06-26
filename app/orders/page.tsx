'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import OrderCard from '@/components/OrderCard';
import { toast } from 'react-toastify';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await fetch(`/api/orders/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
            setLoading(false)
        } catch (error) {
            toast.error('Error fetching orders')
            setLoading(false)
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    if (loading) {
        return <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Orders
            </h1><div className='text-center mt-4'>Loading...</div></div>
    }

    if (!loading && orders.length === 0) {
        return <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Orders
            </h1><div className='text-center mt-4'>No Orders</div></div>
    }

    return (
        <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Orders
            </h1>
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
        </div>
    );
}

export default Orders;
