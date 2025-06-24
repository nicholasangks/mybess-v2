'use client';

import { useState, useRef, useEffect } from 'react';
import H1 from "@/components/Heading/H1"
import { LuEllipsis, LuPen, LuTrash2, LuPlus } from "react-icons/lu";
import AddUserModal from '@/components/AddUserModal';

export default function UserManagement() {
    const [users, setUsers] = useState<{ username: string; role: string; password: string }[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleAddUser = (newUser: { username: string; password: string; role: string }) => {
        setUsers((prev) => [...prev, newUser]);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div>
            <H1 text="User Management" />
            <div className="mb-5">
                <div
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center h-[2.5rem] px-3 rounded-full bg-primary cursor-pointer"
                >Add new user <LuPlus className="ml-3" />
                </div>
            </div>

            <AddUserModal
                isOpen={isModalOpen}
                onCloseAction={() => setModalOpen(false)}
                onSuccessAction={handleAddUser}
            />

            <div className="rounded-tl-lg rounded-tr-lg border border-color-border dark:border-color-border-dark">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-color-border dark:border-color-border-dark text-muted-foreground dark:text-muted-foreground-d">
                            <th className="w-[8%] px-3 py-3 font-normal">ID</th>
                            <th className="w-[20%] px-3 py-3 font-normal">Username</th>
                            <th className="w-[35%] px-3 py-3 font-normal">Permissions</th>
                            <th className="w-[37%] px-3 py-3 font-normal">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="align-top border-b border-color-border dark:border-color-border-dark">
                            <td className="px-3 py-3">A0001</td>
                            <td className="px-3 py-3">admin001</td>
                            <td className="px-3 py-3">
                                <div>
                                    <div>Access Control, Perform Control</div>
                                    {/* <div>Perform Control</div> */}
                                </div>
                            </td>
                            <td className="px-3 py-3">
                                <div className="inline-flex items-center align-middle h-[2rem] mr-1 px-3 rounded-full bg-muted dark:bg-muted-d text-muted-foreground dark:text-muted-foreground-d cursor-pointer">Edit Permissions</div>
                                <div className="relative inline-block align-middle">
                                    <div
                                        className="inline-flex items-center justify-center w-[2rem] h-[2rem] aspect-square rounded-full bg-muted dark:bg-muted-d text-muted-foreground dark:text-muted-foreground-d cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // ⛔ stop click from bubbling to document
                                            setMenuOpen(prev => !prev); // ✅ toggle logic
                                        }}
                                    >
                                        <LuEllipsis />
                                    </div>

                                    {menuOpen && (
                                        <div
                                            ref={menuRef}
                                            className="absolute left-full top-0 w-[12rem] ml-2 border border-color-border dark:border-color-border-dark bg-color-background dark:bg-color-background-dark rounded-lg overflow-hidden z-50"
                                        >
                                            <button
                                                onClick={() => alert('Edit Password')}
                                                className="flex items-center w-full h-[2.5rem] px-4 border-b border-color-border dark:border-color-border-dark hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                                            >
                                                <LuPen className="mr-2 text-muted-foreground dark:text-muted-foreground-d" />Edit Password
                                            </button>
                                            <button
                                                onClick={() => alert('Delete User')}
                                                className="flex items-center w-full h-[2.5rem] px-4 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                                            >
                                                <LuTrash2 className="mr-2 text-muted-foreground dark:text-muted-foreground-d" />Delete User
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}