'use client';

import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { FaUser, FaAngleRight } from "react-icons/fa6";
import ThemeSwitch from "../ThemeSwitch";
import { useTheme } from "next-themes";

export default function SideMenu() {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();
    const pathname = usePathname();
    const [openItems, setOpenItems] = useState<number[]>([]);
    const items = [
        {
            title: 'Overview',
            icon: 'icon-overview',
            link: '/overview'
        },
        {
            title: 'System',
            icon: 'icon-bess',
            link: '/besses',
            sublist: [
                { title: 'Battery System', link: '/besses' },
                { title: 'PCS', link: '/pcs' },
                { title: 'Others', link: '/infrastructure' },
            ]
        },
        {
            title: 'Control',
            icon: 'icon-control',
            link: '/controlpanel'
        },
        {
            title: 'Alarm',
            icon: 'icon-alarm',
            link: '/alarms'
        },
        {
            title: 'Data Trend',
            icon: 'icon-data-trend',
            link: '/datatrend'
        }
    ];

    const handleItemClick = (index: number) => {
        setOpenItems((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    useEffect(() => {
        if (theme !== undefined) setThemeReady(true);
    }, [theme]);

    return (
        <div className="sticky shrink-0 top-0 w-[50px] md:w-[260px] 2xl:w-[280px] h-screen py-6 bg-secondary relative">
            <div className="px-4 md:px-8">
                <img src="/images/brand-assets/logo-short.png" alt="" className="block md:hidden w-full mx-auto" />
                <img src="/images/brand-assets/logo-full.png" alt="" className="hidden md:block w-full" />
            </div>
            <div className="mt-6 xl:mt-10">
                {items.map((item, index) => (
                    <div key={index} className="relative">
                        {item.sublist ? (
                            <>
                                <div
                                    className={`flex items-center h-[2.5rem] my-2.5 px-4 md:px-8 cursor-pointer hover:bg-muted ${pathname === item.link || item.sublist.some(sub => sub.link === pathname) ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                                    onClick={() => handleItemClick(index)}
                                >
                                    <img src={`/images/${item.icon}${themeReady && theme === 'dark' ? '-dark.svg' : '.svg'}`} className="w-[24px] h-[24px]" />
                                    <div className="hidden md:block ml-3">{item.title}</div>
                                    <FaAngleRight className={`ml-auto hidden md:block transition-transform duration-200 ${openItems.includes(index) ? 'rotate-90' : ''}`} />
                                </div>

                                {/* Mobile popup */}
                                {openItems.includes(index) && (
                                    <div className="md:hidden absolute left-[60px] top-0 z-50 bg-background p-3 shadow-lg border border-border rounded-md w-48">
                                        {item.sublist.map((sub, subIdx) => (
                                            <Link href={sub.link} key={subIdx}>
                                                <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1">
                                                    {sub.title}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Desktop inline */}
                                {openItems.includes(index) && (
                                    <div className="hidden md:flex mb-3 pl-16 flex-col gap-2">
                                        {item.sublist.map((sub, subIdx) => (
                                            <Link href={sub.link} key={subIdx}>
                                                <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1">
                                                    {sub.title}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link href={item.link} key={index}>
                                <div className={`flex items-center justify-center md:justify-normal h-[2.5rem] my-2.5 px-4 md:px-8 cursor-pointer hover:bg-muted ${pathname === item.link ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground'}`}>
                                    <img src={`/images/${item.icon}${themeReady && theme === 'dark' ? '-dark.svg' : '.svg'}`} className="w-[24px] h-[24px]" />
                                    <div className="hidden md:block ml-3">{item.title}</div>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-8 left-0 w-full border-t border-border px-4 md:px-8 pt-6">
                <ThemeSwitch />
                <div className="flex items-center justify-center w-full mt-5 md:justify-normal">
                    <div className="flex items-center justify-center w-8 h-8 md:mr-3 rounded-full bg-muted overflow-hidden">
                        <FaUser className="w-[80%] h-[80%] object-contain fill-accent-b" />
                    </div>
                    <div className="hidden md:block">User</div>
                </div>
            </div>
        </div>
    );
}
