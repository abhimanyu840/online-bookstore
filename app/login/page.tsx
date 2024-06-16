"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { loginSchema } from '@/zod/loginSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { setCookie } from 'cookies-next';

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof loginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setLoading(true);
        try {
            const loginUser = async () => {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                const data = await response.json()
                if (response.ok) {
                    // setCookie('token', data.token);
                    document.cookie = `token=${data.token}`;
                    setLoading(false)
                    toast.success('Login Successful');
                    location.reload()
                    router.push('/')
                } else {
                    // login failed, show error message
                    toast.error(data.message)
                    setLoading(false)
                }
            }
            loginUser()
        } catch (error) {
            console.error(error);
            toast.error('Oops! Login Failed');
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Login
            </h1>
            <div className="form mt-4 container">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" type='email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login
