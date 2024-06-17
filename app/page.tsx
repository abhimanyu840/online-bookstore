import Image from 'next/image';
import Link from 'next/link';
import bookImage from '@/public/bookImage.png'
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='min-h-[95vh] container'>
      <div className="hero mt-5  flex flex-col-reverse md:flex-row  justify-between ">
        <div className="right flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center mt-4">Welcome to the best online BookStore</h1>
          <h2 className="text-1xl md:text-3xl font-bold text-center mt-4">
            The Best Online Bookstore Available
          </h2>
          <div className="mx-auto mt-5">
            <Link href="/books">
              <Button variant={'purple'}>See Books</Button>
            </Link>
          </div>
        </div>
        <div className="left mt-4 md:mt-0 mx-auto">
          <Image src={bookImage} height={450} width={450} alt='book-image' priority />
        </div>
      </div>
    </main>
  );
}
