// const API_URL = "http://localhost:3002";
// import { axiosInstance } from "@/app/context/axiosInstance";
//
// export const getAll = async (access_token: string | null) => {
//     const response = await axiosInstance.get(`${API_URL}/task` , {
//         headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//         }
//     });
//     return response.data;
// };
//
// export const update = async (access_token: string | null, title:string, id:string) => {
//     const response = await axiosInstance.patch(`${API_URL}/task/${id}`, { title },{
//         headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//         }
//     });
//     return response.data;
// };
//
// export const updateCompleted = async (access_token: string | null, completed:boolean, id:string) => {
//     const response = await axiosInstance.patch(`${API_URL}/task/${id}`, { completed: !completed },{
//         headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//         }
//     });
//     return response.data;
// };
//
// export const deleteTask = async (access_token: string | null, id:string) => {
//     const response = await axiosInstance.delete(`${API_URL}/task/${id}`,{
//         headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//         }
//     });
//     return response.data;
// };
//
// export const create = async (access_token: string | null, title:string) => {
//     const response = await axiosInstance.post(`${API_URL}/task`, { title },{
//         headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//         }
//     });
//     return response.data;
// };


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
