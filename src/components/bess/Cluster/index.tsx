import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Card from "@/components/Card"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"
import { formatNumber } from "@/helpers/formatters"
import StatusTag from "@/components/StatusTag";

interface ClusterProps {
    className?: string;
    onClick?: () => void;
    data: any;
}

export default function Cluster({
    className,
    onClick,
    data }: ClusterProps
) {

    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    return (
        <Card
            className={`md:flex md:items-center mb-4 xl:mb-5 cursor-pointer${className ? ' ' + className : ''}`}
            onClick={onClick}
        >
            <div className="w-full md:w-[35%] md:!pr-3.5 !p-0 md:border-r border-border">
                <H3 text={`Cluster ${data.cId}`} className="!mb-0" />
                {themeReady
                    ? <img src={`/images/cluster${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-[70%] md:w-full h-auto mx-auto" />
                    : <img src={`/images/cluster.png`} alt="" className="w-[70%] md:w-full h-auto mx-auto" />
                }
                <div className="grid grid-cols-2 mb-6 md:mb-0 border-t border-b md:border-b-0 border-border">
                    <div className="pt-2 pb-2 md:pb-0 px-2 border-r border-border text-center">
                        <Label text="SOC" />
                        <div>{formatNumber(data?.SOC, 1, '%')}</div>
                    </div>
                    <div className="pt-2 px-2 text-center">
                        <Label text="SOH" />
                        <div>{formatNumber(data?.SOH, 1, '%')}</div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[65%] md:pl-4 xl:pl-7">
                <div className="grid grid-cols-2">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label text="Connection Status" className="mb-0.5" />
                            <StatusTag status={data?.runningStatus} />
                        </div>
                        <div>
                            <Label text="Total Voltage" />
                            <div>{formatNumber(data?.totalVoltage, 1, ' V')}</div>
                        </div>
                        <div>
                            <Label text="Total Current" />
                            <div>{formatNumber(data?.totalCurrent, 1, ' A')}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <Label text="Max Cell Temperature" />
                            <div>{formatNumber(data?.maxCellTemperature, 1, ' °C')}</div>
                        </div>
                        <div>
                            <Label text="Min Cell Voltage" />
                            <div>{formatNumber(data?.minCellVoltage, 1, ' V')}</div>
                        </div>
                        <div>
                            <Label text="Max Cell Voltage" />
                            <div>{formatNumber(data?.maxCellVoltage, 1, ' V')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}