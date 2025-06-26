'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const [themeReady, setThemeReady] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    if (!mounted) return null

    return (
        <div className="flex items-center justify-center h-[2.5rem] xl:justify-between" onClick={toggleTheme}>
            <div className="flex items-center cursor-pointer">
                <div className="xl:mr-2.5">
                    {themeReady
                        ? <img src={`/images/icon-moon${theme === 'dark' ? '-dark.svg' : '.svg'}`} alt="" className="w-[25px] h-[25px]" />
                        : <img src={`/images/icon-moon.svg`} alt="" className="w-[25px] h-[25px]" />
                    }
                </div>
                <div className={`hidden xl:block text-muted-foreground`}>Dark Mode</div>
            </div>
            <div className="hidden xl:block relative cursor-pointer">
                <div className="flex items-center w-8 xl:w-10 h-5 rounded-full bg-muted p-0.5">
                    <motion.div
                        className="w-1/2 h-full bg-white dark:bg-primary rounded-full"
                        initial={{ x: theme === 'light' ? 0 : '50%' }}
                        animate={{ x: theme === 'light' ? 0 : '100%' }}
                    >
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
