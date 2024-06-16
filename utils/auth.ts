import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { z } from 'zod';
import { registerSchema } from '@/zod/registerSchema';

export type registerUserType = z.infer<typeof registerSchema>;

export async function registerUser(registerUserInput: registerUserType) {

    const res = registerSchema.safeParse(registerUserInput)
    if (!res.success) {
        throw new Error(res.error.message)
    }

    const { name, email, password } = res.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return createToken(user);
}

export async function loginUser(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return createToken(user);
}

function createToken(user: any) {
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, String(process.env.SECRET_KEY), {
        expiresIn: '5d',
    });
    return { token, user: { id: user._id, email: user.email } };
}

export function decodeToken(token: string) {
    try {
        const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}
