import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './features/cart/cartSlice';

// Function to load state from localStorage
const loadState = (): CartState | undefined => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state from localStorage", err);
        return undefined;
    }
};

// Function to save state to localStorage
const saveState = (state: CartState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        console.error("Could not save state to localStorage", err);
    }
};

export const makeStore = () => {
    const preloadedState = loadState();
    const store = configureStore({
        reducer: {
            cart: cartReducer
        },
        preloadedState: preloadedState ? { cart: preloadedState } : undefined,
    });

    store.subscribe(() => {
        saveState(store.getState().cart);
    });

    return store;
};

// Infer the type of the Redux store
export type AppStore = ReturnType<typeof makeStore>;
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
