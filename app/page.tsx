import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Online Bookstore</h1>
      <nav>
        <ul>
          <li><Link href="/books">Books</Link></li>
          <li><Link href="/auth/register">Register</Link></li>
          <li><Link href="/auth/login">Login</Link></li>
        </ul>
      </nav>
    </main>
  );
}
