import Image from 'next/image';
import Link from 'next/link';
import bookImage from '@/public/bookImage.png'
import Picme from '@/public/PicmeEnhanced.jpg'
import { Button } from '@/components/ui/button';

export default function Home() {
  // Project guided by Rakesh Ranjan Sir 
  // Design and Developed by Abhimanyu Kumar
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
      <hr />
      <div className="hero mt-5  flex flex-col-reverse md:flex-row  justify-between ">
        <div className="right flex flex-col gap-4 justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-center mt-4">Special thanks to <span className="text-purple-400 font-extrabold underline">Rakesh Ranjan Sir</span></h1>
          <h2 className="text-1xl md:text-3xl font-bold text-center mt-4">
            for guiding throughout the project
          </h2>
          <div className="mx-auto mt-5">
          </div>
        </div>
        <div className="left mt-4 md:mt-0 mx-auto ">
          <Image src={Picme} height={350} width={350} alt='book-image' priority className='rounded-full' />
        </div>
      </div>
      <hr />
      <h2 className="text-1xl md:text-3xl font-bold text-center my-4 p-5">
        Design and Developed by Abhimanyu Kumar
      </h2>
    </main>
  );
}
