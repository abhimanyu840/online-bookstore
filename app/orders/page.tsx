'use client'
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react'

const OrdersList = dynamic(() => import('@/components/OrdersList'), {
    loading: () => <div className='mt-5 text-2xl font-semibold text-center'>Loading Orders...</div>
})

const Orders = () => {

    return (
        <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Orders
            </h1>

            <Suspense>
                <OrdersList />
            </Suspense>

        </div>
    );
}

export default Orders;
