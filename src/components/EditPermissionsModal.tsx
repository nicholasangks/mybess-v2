'use client';

import { useState, useRef, useEffect } from 'react';
import Switch from './Switch';

interface UserData {
  username: string;
  password: string;
  role: string;
}

interface EditPermissionsModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onSuccessAction: (user: UserData) => void;
}

export default function EditPermissionsModal({ isOpen, onCloseAction, onSuccessAction }: EditPermissionsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCloseAction();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCloseAction]);

  const handleAddUser = async () => {
    if (!username || !password) return;

    const newUser = { username, password, role };
    // Simulate API call
    await new Promise((res) => setTimeout(res, 500));

    onSuccessAction(newUser); // ✅ Update parent list
    onCloseAction(); // ✅ Close modal
    setUsername('');
    setPassword('');
    setRole('admin');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center justify-center inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div ref={modalRef} className="bg-white dark:bg-background-d p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-medium mb-8">Add New User</h2>
        <div className="">
          <div className="mb-4">
            <div className="mb-1 text-muted-foreground dark:text-muted-foreground-d">Username</div>
            <input
              className="w-full h-[2.5rem] px-3 rounded-md border border-border dark:border-border-d bg-muted dark:bg-muted-d outline-none"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <div className="mb-1 text-muted-foreground dark:text-muted-foreground-d">Password</div>
            <input
              className="w-full h-[2.5rem] px-3 rounded-md border border-border dark:border-border-d bg-muted dark:bg-muted-d outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <div className="mb-1 text-muted-foreground dark:text-muted-foreground-d">Permissions</div>
            <div className="rounded-md border border-border dark:border-border-d">
              <div className="flex items-center justify-between px-3 py-3 border-b border-border dark:border-border-d">
                Access Control Page
                <Switch
                  checked={true}
                  onChange={(val) => console.log('Toggled:', val)}
                />
              </div>
              <div className="flex items-center justify-between px-3 py-3 border-b border-border dark:border-border-d">
                Perform Action
                <Switch
                  checked={true}
                  onChange={(val) => console.log('Toggled:', val)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onCloseAction} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button onClick={handleAddUser} className="h-[2.5rem] px-4 bg-primary dark:bg-primary-d text-white rounded-full">Add User</button>
          </div>
        </div>
      </div>
    </div>
  );
}
