import Image from 'next/image';
import AddToCartBtn from '@/components/AddToCartBtn';

interface BookData {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    author: string;
}

const BookDetails = async ({ params }: { params: { id: string } }) => {
    const id = params.id;

    // Fetch the book data on the server side
    const res = await fetch(`${process.env.PROD_SERVER}/api/books/${id}`);
    if (!res.ok) {
        // Handle error
        return <div>Failed to load book</div>;
    }
    const book: BookData = await res.json();

    return (
        <div className='container p-2'>
            <section className="text-gray-600 dark:text-gray-400 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image src={book.image} width={500} height={500} priority alt='book-img' />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 dark:text-gray-400 tracking-widest">{book.author}</h2>
                            <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">{book.title}</h1>
                            <p className="leading-relaxed">{book.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 dark:border-gray-700 mb-5"></div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900 dark:text-white">${book.price}</span>
                                <AddToCartBtn
                                    id={book.id}
                                    title={book.title}
                                    description={book.description}
                                    image={book.image}
                                    price={book.price}
                                    author={book.author}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookDetails;
