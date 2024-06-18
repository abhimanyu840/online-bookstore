'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import OrderCard from '@/components/OrderCard';
import { toast } from 'react-toastify';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
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
                toast.error('Error fetching orders')
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Orders
            </h1>
            <div>
                {orders.map(order => (
                    <OrderCard
                        key={order._id}
                        author={order.user.name}
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
