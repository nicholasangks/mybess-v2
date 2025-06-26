import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Card from "@/components/Card"
import Label from "@/components/Label"
import { motion } from "framer-motion"
import { formatNumber } from '@/helpers/formatters'

interface GridProps {
    data: any;
}

export default function Grid({ data }: GridProps) {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();
    const [onOff, setOnOff] = useState(data.onOff || "off")

    const handleOnGrid = () => {
        if (onOff === "on") {
            setOnOff("off")
        } else {
            setOnOff("on")
        }
    }

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    return (
        <Card className="h-full">
            <div className="flex justify-between">
                <div>
                    <Label text="Grid mode" />
                    <div className="font-[400]">
                        {data.gridMode}
                    </div>
                </div>

                <div>
                    <div className="flex items-center">
                        <Label text="Off / On" />
                    </div>
                    {/* <Label text="Off / On" /> */}
                    <div className={`flex items-center w-10 h-4 mt-1.5 ml-auto mr-0 p-0.5 cursor-pointer ${onOff === "on" ? "bg-accent-b" : "bg-muted"}`}
                        onClick={() => handleOnGrid()}
                    >
                        <motion.div
                            initial={{ x: onOff === 'off' ? 0 : '50%' }}
                            animate={{ x: onOff === 'off' ? 0 : '100%' }}
                            className={`w-1/2 h-full bg-background`}
                        ></motion.div>
                    </div>
                </div>
            </div>
            {themeReady
                ? <img src={`/images/grid${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-[45%] md:w-[57%] 3xl:w-[40%] h-auto mx-auto mt-3 mb-3" />
                : <img src={`/images/grid.png`} alt="" className="w-[45%] md:w-[57%] 3xl:w-[40%] h-auto mx-auto mt-3 mb-3" />
            }
            <div className="grid grid-cols-2 border-t border-border text-center">
                <div className="pt-2.5 text-center border-r border-border">
                    <Label text="Active Power" />
                    <div>{formatNumber(data?.activePowerCtrl, 1, ' kW')}</div>
                </div>
                <div className="pt-2.5 text-center">
                    <Label text="Power Factor" />
                    <div>{formatNumber(data?.powerFactorCtrl, 2)}</div>
                </div>
            </div>
        </Card>
    )
}