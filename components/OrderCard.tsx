import React from 'react'

interface OrderData {
    title: string;
    author: string;
    price: number;
    image: string;
    quantity: string
}

const OrderCard = (OrderData: OrderData) => {
    return (
        <div className=' w-10/12 bg-green-200 dark:bg-gray-800 shadow-md dark:shadow-gray-800 border rounded-md my-4 mx-auto p-2 md:p-4 border-green-800 dark:border-blue-800'>
            <div className='flex justify-between items-center p-4'>
                <div className='flex items-center'>
                    <img src={OrderData.image} alt={OrderData.title} className='w-12 h-12 rounded' />
                    <div className='ml-4'>
                        <h2 className='text-lg'><b><u>Book Name:</u></b> {OrderData.title}</h2>
                        <p className='text-sm'><b><u>Author:</u></b> {OrderData.author}</p>
                        <p className='text-sm'><b><u>Price:</u></b> ₹{OrderData.price}</p>
                        <p className='text-sm'><b><u>Quantity:</u></b> {OrderData.quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
