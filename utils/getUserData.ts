'use server'
import { decodeToken } from "./auth";

export async function getUserData(token: string) {
    if (token) {
        const data = decodeToken(token);
        return data;
    }
}