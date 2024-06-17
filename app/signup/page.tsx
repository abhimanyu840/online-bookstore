'use client'
import React, { useState } from 'react'
import { registerSchema } from '@/zod/registerSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
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
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'


const Signup = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const { login } = useAuth(); // Get the login method from the context

    // 1. Define your form.
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            // confirmPassword: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof registerSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)
        setLoading(true)
        try {
            const createUser = async () => {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                const data = await response.json()
                if (response.ok) {
                    toast.success("Created Account Successfully")
                    login(data.token); // Use the login method from the context
                    setLoading(false)
                    router.push("/")
                } else {
                    toast.error("Login Failed")
                    setLoading(false)
                }
            }
            createUser()
        } catch (error) {
            console.error(error)
            setLoading(false)
            toast.error('Oops! Some error occurred');
        }
    }

    return (
        <div className='container '>
            <h1 className="mt-4 font-bold text-center underline text-4xl text-green-950 dark:text-green-500">
                Sign Up
            </h1>
            <div className="form mt-4 container">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <Button type="submit" className='w-full md:w-1/2' disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "SignUp"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Signup
