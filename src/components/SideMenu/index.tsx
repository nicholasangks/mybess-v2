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
    const items = [
        {
            title: 'Overview',
            icon: 'icon-overview',
            link: '/overview'
        },
        {
            title: 'Besses',
            icon: 'icon-bess',
            link: '/besses'
        },
        {
            title: 'PCs',
            icon: 'icon-pcs',
            link: '/pcs'
        }
        // {
        //     title: 'Settings',
        //     icon: 'icon-settings.svg',
        //     link: '/settings',
        //     sublist: [
        //         {
        //             title: 'Profile',
        //             link: '/settings/profile'
        //         },
        //         {
        //             title: 'Account',
        //             link: '/settings/account'
        //         }
        //     ]
        // }
    ]

    const handleItemClick = (index: any) => {
        // if (openItems.includes(index)) {
        //     setOpenItems(openItems.filter((item) => item !== index));
        // } else {
        //     setOpenItems([...openItems, index]);
        // }
    };

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);


    return (
        <div className="sticky top-0 w-[50px] md:w-[270px] xl:w-[290px] h-screen md:px-6 lg:px-8 py-6 bg-color-primary dark:bg-color-primary-dark">
            <img src="/images/brand-assets/logo-short.png" alt="" className="block md:hidden w-[70%] h-auto object-contain mx-auto" />
            <img src="/images/brand-assets/logo-full.png" alt="" className="hidden md:block w-[80%] h-auto object-contain" />
            <div className="mt-6 lg:mt-10">
                {items.map((item: any, index: number) => (
                    <div key={index}>
                        {item.sublist ? (
                            <div>
                                <div className="flex items-center py-3 cursor-pointer" onClick={() => handleItemClick(index)}>
                                    <div className="mr-2.5">
                                        {themeReady
                                            ? <img src={`/images/${item.icon}${theme === 'dark' ? '-dark.svg' : '.svg'}`} alt="" className="w-[25px] h-[25px]" />
                                            : <img src={`/images/${item.icon}.svg`} alt="" className="w-[25px] h-[25px]" />
                                        }
                                    </div>
                                    <div className="text-color-foreground-light">{item.title}</div>
                                    <FaAngleRight className="ml-auto" />
                                </div>
                            </div>
                        ) : (
                            <Link href={item.link} key={index}>
                                <div key={index} className="flex items-center justify-center md:justify-normal py-3 cursor-pointer" onClick={() => setActiveIndex(index)}>
                                    <div className="md:mr-2.5">
                                        {/* <object type="image/svg+xml" data={`/images/${item.icon}${theme === 'dark' ? "-white" :  "-white"}.svg`} className="w-[25px] h-[25px]"></object> */}
                                        {themeReady
                                            ? <img src={`/images/${item.icon}${theme === 'dark' ? '-dark.svg' : '.svg'}`} alt="" className="w-[25px] h-[25px]" />
                                            : <img src={`/images/${item.icon}.svg`} alt="" className="w-[25px] h-[25px]" />
                                        }
                                    </div>
                                    <div className={`hidden md:block text-color-foreground-light dark:text-color-foreground-light-dark`}>{item.title}</div>
                                </div>
                            </Link>
                        )}

                    </div>
                ))}
            </div>

            <div className="mt-5 py-5 border-t border-color-border dark:border-color-border-dark">
                <div className="flex items-center justify-between">
                    <div className="flex items-center py-3 cursor-pointer">
                        <div className="mr-2.5">
                            {themeReady
                                ? <img src={`/images/icon-moon${theme === 'dark' ? '-dark.svg' : '.svg'}`} alt="" className="w-[25px] h-[25px]" />
                                : <img src={`/images/icon-moon.svg`} alt="" className="w-[25px] h-[25px]" />
                            }
                            {/* <img src={`/images/icon-moon${currentTheme === 'dark' ? "-white" : ""}.svg`} className="w-[25px] h-[25px]" /> */}
                        </div>
                        <div className={`hidden md:block text-color-foreground-light dark:text-color-foreground-light-dark`}>Dark Mode</div>
                    </div>
                    <ThemeSwitch />
                    {/* */}
                </div>
            </div>

            <div className="absolute bottom-8 flex items-center justify-center w-full md:w-auto md:justify-normal">
                <div className="flex items-end justify-center w-8 h-8 md:mr-3 rounded-full bg-color-second dark:bg-color-second-dark overflow-hidden">
                    <FaUser className="w-[80%] h-[80%] object-contain fill-color-third dark:fill-color-third-dark" />
                </div>
                <div className="hidden md:block">User</div>
            </div>
        </div>
    )
}