'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    if (!mounted) return null

    return (
        <div className="relative cursor-pointer">
            <div className="flex items-center w-10 h-4 bg-color-second dark:bg-color-second-dark p-0.5" onClick={toggleTheme}>
                <motion.div
                    className="w-1/2 h-full bg-white dark:bg-color-third-dark"
                    initial={{ x: theme === 'light' ? 0 : '50%' }}
                    animate={{ x: theme === 'light' ? 0 : '100%' }}
                >
                </motion.div>
            </div>
            {/* <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-200 rounded-full ${theme === 'light' ? 'translate-x-0' : 'translate-x-full'}`}></div> */}
        </div>
    )
}
