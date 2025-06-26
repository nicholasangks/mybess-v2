import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Card from "@/components/Card"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"
import { formatNumber } from '@/helpers/formatters';
import StatusTag from "@/components/StatusTag";

interface PCProps {
    data: any;
    className?: string;
}

export default function PC({ data, className }: PCProps) {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    return (
        <Card className="h-full items-center mb-4 md:mb-0">
            <div className="relative md:grid md:grid-cols-10 md:items-center h-full">
                <div className="relative flex items-center justify-center col-span-3 h-full py-0 md:pr-3 md:border-r border-border">
                    <div>
                        <div className="flex justify-between">
                            <H3 text="PCS 1" className="!mb-0" />
                            <StatusTag status={data?.runningStatus ?? '-'} />
                        </div>
                        {themeReady
                            ? <img src={`/images/pcs${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-[80%] md:w-[85%] lg:w-full 2xl:w-[95%] mt-5 mx-auto" />
                            : <img src={`/images/pcs.png`} alt="" className="w-[80%] md:w-[85%] lg:w-full 2xl:w-[95%] mt-5 mx-auto" />
                        }
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-7 md:col-span-7">
                    <div>
                        <Label text="PCS Status" />
                        <div>{data?.runningStatus ?? '-'}</div>
                    </div>
                    <div>
                        <Label text="Mode" />
                        <div>{data?.gridMode ?? '-'}</div>
                    </div>
                    <div>
                        <Label text="Voltage" />
                        <div>{formatNumber(data?.busVoltage, 1, ' V')}</div>
                    </div>

                    <div>
                        <Label text="Current" />
                        <div>{formatNumber(data?.busCurrent, 1, ' A')}</div>
                    </div>
                    <div>
                        <Label text="Power" />
                        <div>{formatNumber(data?.busPower, 1, ' V')}</div>
                    </div>

                    <div>
                        <Label text="Frequency" />
                        <div>{formatNumber(data?.acFrequency, 1, ' Hz')}</div>
                    </div>

                    <div>
                        <Label text="DC Voltage" />
                        <div>{formatNumber(data?.dcVoltage, 1, ' V')}</div>
                    </div>

                    <div>
                        <Label text="DC Current" />
                        <div>{formatNumber(data?.dcCurrent, 1, ' A')}</div>
                    </div>
                    <div>
                        <Label text="DC Power" />
                        <div>{formatNumber(data?.dcPower, 1, ' V')}</div>
                    </div>
                </div>
            </div>
        </Card>
    )
}