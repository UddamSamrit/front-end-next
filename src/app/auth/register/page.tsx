"use client";

import { useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { register, login } from "@/app/service/userRepository";

const Login = () => {
    const router = useRouter();
    const { loginUser } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { user } = await register(displayName, email, username, password);
            if (user.username){
                const { accessToken, refreshToken , user } = await login(username, password);
                document.cookie = `access_token=${accessToken}; path=/; max-age=3600`;
                document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}`;
                loginUser(accessToken, refreshToken, user);
                router.push('/');
            }
        }catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image className="mx-auto h-10 w-auto rounded-full"
                         src="/assets/samrituddam.jpeg"
                           width={500}
                           height={500}
                         alt="Your Company"/>
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your
                        account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="displayName" className="block text-sm/6 font-medium text-gray-900">DisplayName</label>
                            <div className="mt-2">
                                <input id="displayName" name="displayName" type="text" autoComplete="displayName" required value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                                       className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                       className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
                            <div className="mt-2">
                                <input id="username" name="username" type="text" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)}
                                       className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm/6 font-medium text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       value={password} onChange={(e) => setPassword(e.target.value)}
                                       required
                                       className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Registered already?
                        <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login</Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Login;
