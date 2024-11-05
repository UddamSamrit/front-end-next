import { NextRequest, NextResponse } from 'next/server';
import {register} from "@/app/service/userRepository";

export async function POST(request: NextRequest) {
    try {
        const { displayName, email, username, password } = await request.json();
        const userData = await register(displayName, email, username, password);
        return NextResponse.json({
            message: 'User registered successfully',
            data: userData,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
