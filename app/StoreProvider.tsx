'use client';
import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/lib/store/store';

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore | null>(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        storeRef.current = makeStore();
        setHydrated(true);
    }, []);

    if (!hydrated || !storeRef.current) {
        return null; // Render nothing or a loading spinner until the store is initialized
    }

    return (
        <Provider store={storeRef.current}>{children}</Provider>
    );
};

export default StoreProvider;
