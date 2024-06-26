'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { getUserData } from '@/utils/getUserData';
import { JwtPayload } from 'jsonwebtoken';

interface AuthContextProps {
    loggedIn: boolean;
    user: JwtPayload | null;
    admin: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [admin, setAdmin] = useState(false);
    const [lToken, setLToken] = useState<string>('')

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            checkUser(token as string);
        }
    }, []);

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setLToken(token as string);
        }
    }, [loggedIn])


    const checkUser = async (token: string) => {
        const data = await getUserData(token);
        if (data) {
            setUser(data as JwtPayload);
            setLoggedIn(true);
            if ((data as JwtPayload).role === 'admin') {
                setAdmin(true);
            }
        }
    };

    const login = (token: string) => {
        setCookie('token', token);
        checkUser(token);
    };

    const logout = () => {
        deleteCookie('token');
        setLoggedIn(false);
        setUser(null);
        setAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, user, admin, login, logout, token: lToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
