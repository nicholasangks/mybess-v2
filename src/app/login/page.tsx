'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {

    };

    return (
        <div className="relative flex items-center justify-center h-screen">
            {/* <img src="/images/background-grid.png" alt="" className="absolute w-full h-full object-cover opacity-[0.05]" /> */}
            <div className="relative w-full max-w-[400px] mx-auto">
                <img src="/images/brand-assets/logo-full.png" alt="" className="w-[16rem] h-auto mx-auto mb-11" />
                <div className="flex items-center h-[42px] mb-2.5 rounded-md bg-color-primary dark:bg-color-primary-dark">
                    <div className="flex items-center justify-center w-[2.8rem] h-[calc(100%-10px)] border-r border-white border-opacity-20">
                        <img src="/images/icon-username.svg" alt="" className="h-[55%] w-auto opacity-40" />
                    </div>
                    <input
                        autoFocus
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="flex-grow w-full px-3 bg-transparent outline-none placeholder-white placeholder-opacity-30"
                    />
                </div>

                <div className="flex items-center h-[42px] mb-5 rounded-md bg-color-primary dark:bg-color-primary-dark">
                    <div className="flex items-center justify-center w-[2.8rem] h-[calc(100%-10px)] border-r border-white border-opacity-20">
                        <img src="/images/icon-password.svg" alt="" className="h-[55%] w-auto opacity-40" />
                    </div>
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-grow w-full px-3 bg-transparent outline-none placeholder-white placeholder-opacity-30"
                    />
                </div>

                <div className="flex items-center justify-center w-full h-[42px] rounded-md bg-color-third transition duration-300">
                    Login
                </div>
            </div>
        </div>
    );
}
