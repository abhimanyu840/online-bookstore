'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import ThemeSwitch from './ThemeSwitch';
import { AlignJustify, BaggageClaimIcon, LogOut, User2Icon } from 'lucide-react';
import { getLoginState } from '@/utils/getLoginState';
import { getUserData } from '@/utils/getUserData';
import { JwtPayload } from 'jsonwebtoken';
import { deleteCookie } from 'cookies-next';
import Cart from './Cart'; // Import Cart component
import { useAppSelector } from '@/lib/store/hooks'; // Import useAppSelector
import { RootState } from '@/lib/store/store'; // Import RootState

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [admin, setAdmin] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const cartItems = useAppSelector((state: RootState) => state.cart.items); // Access cart items from Redux store
    const navRef = useRef<HTMLDivElement>(null)

    const checkLoggedIn = async () => {
        const { token } = await getLoginState();
        if (token) {
            setLoggedIn(true);
            setToken(token);
        }
    };

    const checkAdmin = async () => {
        const data = await getUserData(token!);
        if (data) {
            const { id, email, role } = data as JwtPayload;
            if (role === 'admin') {
                setAdmin(true);
            }
        }
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    useEffect(() => {
        if (token) {
            checkAdmin();
        }
    }, [token]);

    const handleLogout = () => {
        deleteCookie('token');
        setLoggedIn(false);
        setAdmin(false);
    };

    const handleCartToggle = () => {
        setCartOpen(!cartOpen);
    };

    const handleToggleNav = () => {
        if (navRef.current?.classList.contains('hidden')) {
            navRef.current?.classList.remove('hidden')
            navRef.current?.classList.add('flex')
        }
        else if (navRef.current?.classList.contains('flex')) {
            navRef.current?.classList.remove('flex')
            navRef.current?.classList.add('hidden')
        }
    }

    const totalItems = cartItems.reduce((acc: any, item: any) => acc + item.quantity, 0);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky backdrop:blur-md shadow-md dark:shadow-gray-800 top-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='text-2xl font-semibold dark:text-white'>
                    <Link href={'/'}>
                        <span className='text-green-700 font-bold text-3xl'>B</span>ook
                        <span className='text-green-700 font-bold text-3xl'>S</span>tore
                    </Link>
                </div>
                <div className="block md:hidden">
                    <AlignJustify onClick={handleToggleNav} />
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown" ref={navRef}>
                    <ul className="flex flex-col w-full md:w-auto gap-2 items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li><Link href={'/'}>Home</Link></li>
                        <li><Link href={'/books'}>Books</Link></li>
                        {!loggedIn ? (
                            <>
                                <li>
                                    <Button variant={'blue'} size={'sm'}><Link href={'/login'}>Login</Link></Button>
                                </li>
                                <li>
                                    <Button variant={'blue'} size={'sm'}><Link href={'/signup'}>SignUp</Link></Button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link href={'/orders'}>Orders</Link></li>
                                <li>
                                    <Button variant={'blue'} size={'sm'} onClick={handleLogout}><LogOut /> Logout</Button>
                                </li>
                                <li>
                                    <div className='p-1 border border-black dark:border-gray-500 rounded-sm shadow shadow-black dark:shadow-gray-700 dark:bg-blue-600 dark:hover:bg-blue-700 mb-1'>
                                        <Link href={'/account'}><User2Icon className='' /></Link>
                                    </div>
                                </li>
                            </>
                        )}
                        <li>
                            <button type="button" onClick={handleCartToggle} className="relative inline-flex items-center p-2 mb-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <BaggageClaimIcon />
                                <span className="sr-only">Notifications</span>
                                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{totalItems}</div>
                            </button>
                        </li>
                        {admin && (
                            <li>
                                <Button variant={'blue'} size={'sm'}><Link href={'/admin'}>Admin Dashboard</Link></Button>
                            </li>
                        )}
                        <li>
                            <ThemeSwitch />
                        </li>
                    </ul>
                </div>
            </div>
            {cartOpen && <Cart cartItems={cartItems} onClose={handleCartToggle} />}
        </nav>
    );
};

export default Navbar;
