import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Card from "@/components/Card"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"
import { DataListWrapper, DataList, DataCell } from "@/components/DataList"
import { GiElectric } from "react-icons/gi";
import { motion } from "framer-motion";

interface BessProps {
    data: any;
}

export default function Bess({ data }: BessProps) {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        // if(data){
        //     console.log(data.SOC)
        //     console.log(parseInt("99"))
        //     if(parseInt(data.SOC) < 50){
        //         console.log("les")
        //     }else{
        //         console.log("mor")
        //     }
        // }
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    return (
        <Card className="mb-4 md:mb-0">
            <div className="flex items-center justify-between">
                <H3 text={`Bess ${data.bId}`} className="!mb-0" />
                <div className="relative flex items-center">
                    {
                        data.runningStatus !== 'Idle' &&
                        <motion.div
                            className="h-6 w-6 mr-1.5 border-t-2 border-l-2 border-color-third-dark rounded-full overflow-hidden"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                    }
                    <GiElectric className={`w-4 h-4 ${data.runningStatus === 'Idle' ? "fill-color-fifth dark:fill-color-fifth-dark" : "absolute left-1 fill-color-third dark:fill-color-third-dark"}`} />
                    {/* <GiElectric className={`w-5 h-5 mr-0.5 ${data.runningStatus === 'Idle' ? "fill-color-fifth dark:fill-color-fifth-dark" : "fill-color-third dark:fill-color-third-dark"}`} /> */}
                    <div className={`text-[1rem] ${data.runningStatus === 'Idle' ? "text-color-fifth dark:text-color-fifth-dark" : "text-color-third dark:text-color-third-dark"}`}>{data.runningStatus}</div>
                </div>
            </div>
            {/* <div>{data.chargeDischargeState}</div> */}
            <div className="flex items-center relative mt-6 mb-5">
                {themeReady
                    ? <img src={`/images/bess${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="absolute left-0 right-0 w-[65%] xl:w-[67%] 2xl:w-[65%] xl:max-w-[210px] h-auto mx-auto" />
                    : <img src={`/images/bess.png`} alt="" className="absolute left-0 right-0 w-[65%] xl:w-[67%] 2xl:[65%] xl:max-w-[210px] h-auto mx-auto" />
                }
                <div className="flex justify-between items-center w-full mt-4 mb-10">
                    <div className="w-50%">
                        <Label text="SOC" />
                        <div>{data.SOC}%</div>
                        <div className="w-full h-[0.21rem] mt-1 bg-[#bfbfbf] dark:bg-color-fifth-dark">
                            <div className={`h-full ${parseInt(data.SOC) < 50 ? "bg-color-fourth dark:bg-color-fourth-dark" : "bg-color-third dark:bg-color-third-dark"}`} style={{ width: parseInt(data.SOC) + '%' }}></div>
                            {/* <div className={`h-full mt-1 ${Math.floor(40) < 50 ? "bg-color-fourth dark:bg-color-fourth-dark" : "bg-color-third dark:bg-color-third-dark"}`} style={{ width: '40%' }}></div> */}
                        </div>
                    </div>
                    <div className="text-right">
                        <Label text="SOH" />
                        <div>{data.SOH}%</div>
                        <div className="w-full h-[0.21rem] mt-1 ml-auto mr-0 bg-[#bfbfbf] dark:bg-color-fifth-dark">
                            <div className={`h-full ${parseInt(data.SOH) < 50 ? "bg-color-fourth dark:bg-color-fourth-dark" : "bg-color-third dark:bg-color-third-dark"}`} style={{ width: parseInt(data.SOH) + '%' }}></div>
                        </div>
                    </div>
                </div>

            </div>
            <DataListWrapper>
                <DataList cols={5}>
                    <DataCell withBgColor={true} className="col-span-3">
                        <Label text="Charge Capacity" />
                    </DataCell>
                    <DataCell withBgColor={true} className="justify-end col-span-2">{data.chargeCapacity} kWh</DataCell>
                </DataList>
                <DataList cols={5}>
                    <DataCell className="col-span-3">
                        <Label text="Discharge Capacity" />
                    </DataCell>
                    <DataCell className="justify-end col-span-2">{data.dischargeCapacity} kWh</DataCell>
                </DataList>
                <DataList cols={5}>
                    <DataCell withBgColor={true} className="col-span-3">
                        <Label text="Power" />
                    </DataCell>
                    <DataCell withBgColor={true} className="justify-end col-span-2">{data.power} kW</DataCell>
                </DataList>
                <DataList cols={5}>
                    <DataCell className="col-span-3">
                        <Label text="Total Current" />
                    </DataCell>
                    <DataCell className="justify-end col-span-2">{data.totalCurrent} A</DataCell>
                </DataList>
                <DataList cols={5}>
                    <DataCell withBgColor={true} className="col-span-3">
                        <Label text="Total Voltage" />
                    </DataCell>
                    <DataCell withBgColor={true} className="justify-end col-span-2">{data.totalVoltage} V</DataCell>
                </DataList>
            </DataListWrapper>
        </Card>
    )
}