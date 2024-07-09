import OrderCard from "./OrderCard";

async function getOrderData(id: string) {
    let res = await fetch(`${process.env.PROD_SERVER}/api/orders/${id}`, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function OrderListServer({ id }: { id: string }) {
    let orders = await getOrderData(id);

    if (orders.length === 0) {
        return <div className='text-center mt-4'>No Orders</div>
    }

    return (
        <div>
            {orders.map((order: any) => (
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