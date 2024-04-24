import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Card from "@/components/Card"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"

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
            <div className="w-full md:w-[35%] md:!pr-3 !p-0  md:border-r border-color-border md:dark:border-color-border-dark">
                <div className="flex items-center justify-between">
                    <H3 text={`Cluster ${data.cId}`} className="!mb-0" />
                    <div className="flex items-center">
                        {/* <div className="w-2 h-2 mr-2 rounded-full bg-color-second"></div> */}
                        <div className={`w-1.5 h-1.5 mr-1.5 rounded-full ${data.runningStatus === 'Idle' ? "bg-color-fifth dark:bg-color-fifth-dark" : "bg-color-third dark:bg-color-third-dark"}`}></div>
                        <div className={`${data.runningStatus === 'Idle' ? "text-color-fifth dark:text-color-fifth-dark" : "text-color-third dark:text-color-third-dark"}`}>{data.runningStatus}</div>
                    </div>
                </div>
                {/* <div>{data.runningStatus}</div> */}
                {themeReady
                    ? <img src={`/images/cluster${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-[70%] md:w-full h-auto mx-auto" />
                    : <img src={`/images/cluster.png`} alt="" className="w-[70%] md:w-full h-auto mx-auto" />
                }
                {/* <div className="mx-auto">
                    <Label text="Alarm count" className="text-sm" />
                    <div className="text-sm">{data.alarmCount}</div>
                </div> */}
                <div className="grid grid-cols-2 mb-6 md:mb-0 border-t border-b md:border-b-0 border-color-border dark:border-color-border-dark">
                    <div className="pt-2 pb-2 md:pb-0 px-2 border-r border-color-border dark:border-color-border-dark text-center">
                        <Label text="SOC" />
                        <div>{data.SOC}%</div>
                    </div>
                    <div className="pt-2 px-2 text-center">
                        <Label text="SOH" />
                        <div>{data.SOH}%</div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[65%] md:pl-4 xl:pl-5">
                <div className="grid grid-cols-2">
                    <div>
                        <div>
                            <div className="px-0 md:px-2 py-2">
                                <Label text="Total Capacity" />
                                <div>- kW</div>
                            </div>
                            <div className="px-0 md:px-2 py-2">
                                <Label text="Total voltage" />
                                <div>{data.totalVoltage} kW</div>
                            </div>
                            <div className="px-0 md:px-2 py-2">
                                <Label text="Total current" />
                                <div>{data.totalCurrent} a</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="px-0 md:px-2 py-2">
                                <Label text="Max cell temperature" />
                                <div>{data.maxCellTemperature} kW</div>
                            </div>
                            <div className="px-0 md:px-2 py-2">
                                <Label text="Min cell voltage" />
                                <div>{data.minCellVoltage} a</div>
                            </div>
                            <div className="px-0 md:px-2 py-2">
                                <Label text="Max cell voltage" />
                                <div>{data.maxCellVoltage} kW</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}