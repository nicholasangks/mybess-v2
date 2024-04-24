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
                <div className="flex items-center justify-center col-span-3 h-full py-3 md:pr-3 md:border-r border-color-border dark:border-color-border-dark text-center">
                    <div>
                        <H3 text="PC 1" />
                        {themeReady
                            ? <img src={`/images/pcs${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-[80%] md:w-full 2xl:w-[95%] mt-6 mx-auto" />
                            : <img src={`/images/pcs.png`} alt="" className="w-[80%] md:w-full 2xl:w-[95%] mt-6 mx-auto" />
                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 md:col-span-7 items-center">
                    <div className="md:pl-4 xl:pl-5">
                        <div className="p-2.5">
                            <Label text="Total Charge Daily" />
                            <div>{data.totalChargeDaily} kwh</div>
                        </div>
                        <div className="p-2.5">
                            <Label text="Total Discharge Daily" />
                            <div>{data.totalDischargeDaily} kwh</div>
                        </div>
                        <div className="p-2.5">
                            <Label text="Total Active Power" />
                            <div>{data.totalActivePower} kwh</div>
                        </div>
                    </div>

                    <div>
                        <div className="p-2.5">
                            <Label text="Total Reactive Power" />
                            <div>{data.totalReactivePower} kVAR</div>
                        </div>
                        <div className="p-2.5">
                            <Label text="Total Apprent Power" />
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