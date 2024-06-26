import Card from "./Card";

async function getData() {
    const res = await fetch(`${process.env.PROD_SERVER}/api/books`, { cache: 'no-store' });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    const books = await getData()

    return <ul className='flex flex-wrap gap-8 items-center justify-center'>
        {books.map((book: any) => (
            <li key={book._id}>
                <Card id={book._id} title={book.title} description={book.description} image={book.image} price={book.price} author={book.author} />
            </li>
        ))}
    </ul>
}