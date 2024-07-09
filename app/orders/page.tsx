'use client'
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react'
import { useAuth } from '../context/AuthContext';
import ServerComponentProvider from '../ServerComponentProvider';
import OrderListServer from '@/components/OrdersListServer';

// const OrdersList = dynamic(() => import('@/components/OrdersList'), {
//     loading: () => <div className='mt-5 text-2xl font-semibold text-center'>Loading Orders...</div>
// })

const OrdersList = dynamic(() => import('@/components/OrdersListServer'), {
    loading: () => <div className='mt-5 text-2xl font-semibold text-center'>Loading Orders...</div>
})

const Orders = () => {
    const { user } = useAuth();
    return (
        <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Orders
            </h1>

            {(user && user.id) && (
                <Suspense fallback={<div className='mt-5 text-2xl font-semibold text-center'>Loading Orders...</div>}>
                    <ServerComponentProvider>
                        <OrdersList id={user.id} />
                    </ServerComponentProvider>
                </Suspense>
            )}

            {/* {(user && user.id) && (
                <ServerComponentProvider >
                    <Suspense>
                        <OrdersList id={user.id} />
                    </Suspense>
                </ServerComponentProvider>)} */}

            {/* <Suspense>
                <OrdersList />
            </Suspense> */}

        </div>
    );
}

export default Orders;
