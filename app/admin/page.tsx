'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Admin = () => {
    const { admin, logout, token } = useAuth();
    const [books, setBooks] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books');
                if (!response.ok) throw new Error('Failed to fetch books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleEdit = (id: string) => {
        router.push(`/admin/editbook/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    token: token, // Ensure token is passed correctly
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete book');
            }
            setBooks(books.filter(book => book._id !== id));
        } catch (error) {
            toast.error('Error deleting book');
            console.error('Error deleting book:', error);
        }
    };

    if (!admin) return <h1>Access Denied</h1>;

    return (
        <div className='container mt-4'>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Admin Dashboard</h1>
                <Button onClick={() => router.push('/admin/uploadbook')}>Upload Book</Button>
                <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
            <Table className="mt-4">
                <TableCaption>A list of available books.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map(book => (
                        <TableRow key={book._id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.price}</TableCell>
                            <TableCell>{book.description}</TableCell>
                            <TableCell>
                                <img src={book.image} alt={book.title} width={50} />
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" onClick={() => handleEdit(book._id)}>Edit</Button>
                                <Button variant="destructive" onClick={() => handleDelete(book._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Admin;
