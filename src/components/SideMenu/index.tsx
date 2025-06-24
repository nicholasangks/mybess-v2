'use client';

import { useState, useEffect } from "react";
import Link from "next/link"
import { FaUser, FaAngleRight } from "react-icons/fa6";
import ThemeSwitch from "../ThemeSwitch";
import { useTheme } from "next-themes";

export default function SideMenu() {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();
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
        <div className="sticky shrink-0 top-0 w-[50px] xl:w-[260px] 2xl:w-[280px] h-screen xl:px-8 py-6 bg-color-primary dark:bg-color-primary-dark">
            <img src="/images/brand-assets/logo-short.png" alt="" className="block xl:hidden w-[70%] h-auto object-contain mx-auto" />
            <img src="/images/brand-assets/logo-full.png" alt="" className="hidden xl:block w-full h-auto object-contain" />
            <div className="mt-6 xl:mt-10">
                {items.map((item, index) => (
                    <div key={index}>
                        {item.sublist ? (
                            <div>
                                <div
                                    className="flex items-center py-3 cursor-pointer"
                                    onClick={() => handleItemClick(index)}
                                >
                                    <div className="mr-2.5">
                                        <img
                                            src={`/images/${item.icon}${themeReady && theme === 'dark' ? '-dark.svg' : '.svg'}`}
                                            alt=""
                                            className="w-[24px] h-[24px]"
                                        />
                                    </div>
                                    <div className="text-color-foreground-light dark:text-color-foreground-light-dark">{item.title}</div>
                                    <FaAngleRight
                                        className={`ml-auto text-color-foreground-light dark:text-color-foreground-light-dark transition-transform duration-200 ${openItems.includes(index) ? 'rotate-90' : ''
                                            }`}
                                    />
                                </div>
                                {openItems.includes(index) && (
                                    <div className="ml-8 flex flex-col gap-2">
                                        {item.sublist.map((sub, subIdx) => (
                                            <Link href={sub.link} key={subIdx}>
                                                <div className="text-sm text-color-foreground-light dark:text-color-foreground-light-dark hover:underline cursor-pointer py-1">
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
                                    className="flex items-center justify-center xl:justify-normal py-3 cursor-pointer"
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="xl:mr-2.5">
                                        <img
                                            src={`/images/${item.icon}${themeReady && theme === 'dark' ? '-dark.svg' : '.svg'}`}
                                            alt=""
                                            className="w-[24px] h-[24px]"
                                        />
                                    </div>
                                    <div className="hidden xl:block text-color-foreground-light dark:text-color-foreground-light-dark">
                                        {item.title}
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-5 py-5 border-t border-color-border dark:border-color-border-dark">
                {/* <div className="flex items-center justify-between">
                    <div className="flex items-center py-3 cursor-pointer">
                        <div className="hidden xl:block xl:mr-2.5">
                            {themeReady
                                ? <img src={`/images/icon-moon${theme === 'dark' ? '-dark.svg' : '.svg'}`} alt="" className="w-[25px] h-[25px]" />
                                : <img src={`/images/icon-moon.svg`} alt="" className="w-[25px] h-[25px]" />
                            }
                        </div>
                        <div className={`hidden xl:block text-color-foreground-light dark:text-color-foreground-light-dark`}>Dark Mode</div>
                    </div>
                    <ThemeSwitch />
                </div> */}
                <ThemeSwitch />
            </div>

            <div className="absolute bottom-8 flex items-center justify-center w-full xl:justify-normal">
                <div className="flex items-end justify-center w-8 h-8 xl:mr-3 rounded-full bg-color-second dark:bg-color-second-dark overflow-hidden">
                    <FaUser className="w-[80%] h-[80%] object-contain fill-color-third dark:fill-color-third-dark" />
                </div>
                <div className="hidden xl:block">User</div>
            </div>
        </div>
    )
}