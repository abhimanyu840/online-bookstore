import { getCookie } from 'cookies-next';

export async function getLoginState() {
    let token: string | null = null;

    const tokenCookie = getCookie('token');
    if (tokenCookie) {
        token = tokenCookie as string;

    }
    return { token };
}
