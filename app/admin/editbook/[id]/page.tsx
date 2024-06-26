'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookSchema } from '@/zod/bookSchema';
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'react-toastify';


const EditBook = () => {
    const { id } = useParams();
    const { admin, token } = useAuth();
    const router = useRouter();

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            author: '',
            price: '',
            description: '',
            image: ''
        },
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`/api/books/${id}`);
                if (!response.ok) throw new Error('Failed to fetch book');
                const data = await response.json();
                // Convert price to string for form input
                form.reset({ ...data, price: data.price.toString() });
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id, form]);

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const updatedValues = {
            ...values,
            price: parseFloat(values.price), // Ensure price is a number
        };

        try {
                const response = await fetch(`/api/books/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify(updatedValues),
                });
                if (!response.ok) throw new Error('Failed to update book');
                router.push('/admin');
        } catch (error) {
            console.error('Error updating book:', error);
            toast.error('Error updating book')
        }
    };

    if (!admin) return <h1>Access Denied</h1>;

    return (
        <div className='container mt-4 '>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Edit Book
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Book Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="book title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="author" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="price" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="image" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Edit</Button>
                </form>
            </Form>
        </div>
    );
};

export default EditBook;
