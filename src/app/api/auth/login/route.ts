import { NextRequest, NextResponse } from 'next/server';
import { login } from "@/app/service/userRepository";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        const userData = await login(username, password);
        console.log(userData);
        // return NextResponse.json({
        //     message: 'User registered successfully',
        //     data: userData,
        // });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: `Registration failed ${error}` }, { status: 500 });
    }
}
