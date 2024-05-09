import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Card from "@/components/Card"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"

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
            <div className="md:grid md:grid-cols-10 md:items-center h-full">
                <div className="flex items-center justify-center col-span-3 h-full py-0 md:pr-3 md:border-r border-color-border dark:border-color-border-dark text-center">
                    <div>
                        <div className="">
                            <H3 text="PCS 1" className="!mb-0" />
                            <div className="text-color-fifth dark:text-color-fifth-dark">Idle</div>
                        </div>
                        {themeReady
                            ? <img src={`/images/pcs${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-[80%] md:w-[85%] lg:w-full 2xl:w-[95%] mt-5 mx-auto" />
                            : <img src={`/images/pcs.png`} alt="" className="w-[80%] md:w-[85%] lg:w-full 2xl:w-[95%] mt-5 mx-auto" />
                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 md:col-span-7">
                    <div className="md:pl-4 xl:pl-5">
                        <div className="p-2.5">
                            <Label text="Total Charge Daily" />
                            <div>{data.totalChargeDaily} kWh</div>
                        </div>
                        <div className="p-2.5">
                            <Label text="Total Discharge Daily" />
                            <div>{data.totalDischargeDaily} kWh</div>
                        </div>
                        <div className="p-2.5">
                            <Label text="Total Active Power" />
                            <div>{data.totalActivePower} kW</div>
                        </div>
                    </div>

                    <div>
                        <div className="p-2.5">
                            <Label text="Total Reactive Power" />
                            <div>{data.totalReactivePower} kVAR</div>
                        </div>
                        <div className="p-2.5">
                            <Label text="Total Apparent Power" />
                            <div>{data.totalApparentPower} kVA</div>
                        </div>

                        <div className="p-2.5">
                            <Label text="Total Power Factor" />
                            <div>{data.totalPowerFactor}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}