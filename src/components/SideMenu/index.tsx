'use client';

import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link"
import { FaUser, FaAngleRight } from "react-icons/fa6";
import ThemeSwitch from "../ThemeSwitch";
import { useTheme } from "next-themes";

export default function SideMenu() {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();
    const pathname = usePathname();
    const [activeIndex, setActiveIndex] = useState(0);
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
                {
                    title: 'Battery System',
                    link: '/besses',
                },
                {
                    title: 'PCS',
                    link: '/pcs',
                },
                {
                    title: 'Others',
                    link: '/infrastructure',
                },
            ]
        },
        // {
        //     title: 'PCS',
        //     icon: 'icon-pcs',
        //     link: '/pcs'
        // },
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
    ]

    const handleItemClick = (index: number) => {
        setOpenItems((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);


    return (
        <div className="sticky shrink-0 top-0 w-[50px] xl:w-[260px] 2xl:w-[280px] h-screen xl:py-6 bg-secondary">
            <div>
                <div className="px-8">
                    <img src="/images/brand-assets/logo-short.png" alt="" className="block xl:hidden w-[70%] h-auto object-contain mx-auto" />
                    <img src="/images/brand-assets/logo-full.png" alt="" className="hidden xl:block w-full h-auto object-contain" />
                </div>
                <div className="mt-6 xl:mt-10">
                    {items.map((item, index) => (
                        <div key={index}>
                            {item.sublist ? (
                                <div>
                                    <div
                                        className={`flex items-center h-[2.5rem] my-2.5 px-8 cursor-pointer hover:bg-muted
                                        ${pathname === '/besses' || pathname === '/pcs' || pathname === '/infrastructure' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                                        onClick={() => handleItemClick(index)}
                                    >
                                        <div className="mr-2.5">
                                            <img
                                                src={`/images/${item.icon}${themeReady && theme === 'dark' ? '-dark.svg' : '.svg'}`}
                                                alt=""
                                                className="w-[24px] h-[24px]"
                                            />
                                        </div>
                                        <div>{item.title}</div>
                                        <FaAngleRight
                                            className={`ml-auto text-muted-foreground transition-transform duration-200 ${openItems.includes(index) ? 'rotate-90' : ''
                                                }`}
                                        />
                                    </div>
                                    {openItems.includes(index) && (
                                        <div className="mb-3 pl-16 flex flex-col gap-2">
                                            {item.sublist.map((sub, subIdx) => (
                                                <Link href={sub.link} key={subIdx}>
                                                    <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1">
                                                        {sub.title}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href={item.link} key={index}>
                                    <div
                                        className={`flex items-center justify-center xl:justify-normal h-[2.5rem] my-2.5 px-8 cursor-pointer hover:bg-muted
                                    ${pathname === item.link ? 'bg-muted text-white' : 'text-muted-foreground'}`}
                                    >
                                        <div className="xl:mr-2.5">
                                            <img
                                                src={`/images/${item.icon}${themeReady && theme === 'dark' ? '-dark.svg' : '.svg'}`}
                                                alt=""
                                                className="w-[24px] h-[24px]"
                                            />
                                        </div>
                                        <div className="hidden xl:block">
                                            {item.title}
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 left-0 w-full border-t border-border px-8 pt-6">
                <ThemeSwitch />
                <div className="flex items-center justify-center w-full mt-5 xl:justify-normal">
                    <div className="flex items-end justify-center h-[1.5rem] w-auto aspect-square xl:mr-3 rounded-full bg-muted overflow-hidden">
                        <FaUser className="w-[80%] h-[80%] object-contain fill-accent-b" />
                    </div>
                    <div className="hidden xl:block">User</div>
                </div>
            </div>
        </div>
    )
}