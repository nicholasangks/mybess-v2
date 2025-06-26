import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Card from "@/components/Card"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"
import { DataListWrapper, DataList, DataCell } from "@/components/DataList"
import { GiElectric } from "react-icons/gi";
import { motion } from "framer-motion";
import { formatNumber } from "@/helpers/formatters"
import BatteryBar from "@/components/BatteryBar";

interface BessProps {
    data: any;
    withClusterVoltage?: boolean
}

export default function Bess({ data, withClusterVoltage }: BessProps) {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    return (
        <div>
            <Card className="mb-4 md:mb-0">
                <div className="flex items-center justify-between">
                    <H3 text={`Bess ${data?.bId ?? ''}`} className="!mb-0" />
                    <div className="relative flex items-center">
                        {
                            data.runningStatus !== 'Idle' &&
                            <motion.div
                                className="flex items-center justify-center h-8 w-8 mr-1.5 border-t border-l border-accent-a rounded-full overflow-hidden"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            ></motion.div>
                        }
                        <GiElectric className={`w-4 h-4 ${data.runningStatus === 'Idle' ? "fill-muted" : "absolute left-2 fill-accent-a"}`} />
                        <div className={`ml-1 text-sm ${data.runningStatus === 'Idle' ? "text-muted-foreground" : "text-accent-a"}`}>{data.runningStatus}</div>
                    </div>
                </div>
                {/* <div>{data.chargeDischargeState}</div> */}
                <div className="flex items-center relative mt-6 mb-5">
                    {themeReady
                        ? <img src={`/images/bess-v2${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="absolute left-0 right-0 w-[65%] xl:w-[75%] xl:max-w-[235px] 2xl:w-[65%] h-auto mx-auto" />
                        : <img src={`/images/bess-v2.png`} alt="" className="absolute left-0 right-0 w-[65%] xl:w-[67%] 2xl:[65%] xl:max-w-[210px] h-auto mx-auto" />
                    }
                    <div className="flex justify-between items-center w-full mt-4 mb-10">
                        <div className="w-50%">
                            <Label text="SOC" />
                            <div className="mb-1">{formatNumber(data?.SOC, 1, '%')}</div>
                            <BatteryBar percentage={Number(data.SOC)} />
                        </div>
                        <div className="text-right">
                            <Label text="SOH" />
                            <div className="mb-1">{formatNumber(data?.SOH, 1, '%')}</div>
                            <BatteryBar percentage={Number(data.SOC)} />
                        </div>
                    </div>

                </div>
                <DataListWrapper>
                    <DataList cols={5}>
                        <DataCell withBgColor={true} className="col-span-3">
                            <Label text="Charge Capacity" />
                        </DataCell>
                        <DataCell withBgColor={true} className="justify-end col-span-2">{formatNumber(data?.chargeCapacity, 1, ' kWh')}</DataCell>
                    </DataList>
                    <DataList cols={5}>
                        <DataCell className="col-span-3">
                            <Label text="Discharge Capacity" />
                        </DataCell>
                        <DataCell className="justify-end col-span-2">{formatNumber(data?.dischargeCapacity, 1, ' kWh')}</DataCell>
                    </DataList>
                    <DataList cols={5}>
                        <DataCell withBgColor={true} className="col-span-3">
                            <Label text="Power" />
                        </DataCell>
                        <DataCell withBgColor={true} className="justify-end col-span-2">{formatNumber(data?.power, 1, ' kW')}</DataCell>
                    </DataList>
                    <DataList cols={5}>
                        <DataCell className="col-span-3">
                            <Label text="Total Current" />
                        </DataCell>
                        <DataCell className="justify-end col-span-2">{formatNumber(data?.totalCurrent, 1, ' A')}</DataCell>
                    </DataList>
                    <DataList cols={5}>
                        <DataCell withBgColor={true} className="col-span-3">
                            <Label text="Total Voltage" />
                        </DataCell>
                        <DataCell withBgColor={true} className="justify-end col-span-2">{formatNumber(data?.totalVoltage, 1, ' V')}</DataCell>
                    </DataList>
                </DataListWrapper>

                {withClusterVoltage &&
                    <>
                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="Max Cell Voltage" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">{formatNumber(data?.maxCellVoltage, 1, ' V')}</DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3">
                                <Label text="Min Cell Voltage" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2">{formatNumber(data?.minCellVolt, 1, ' V')}</DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="Max Cell Temperature" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">{formatNumber(data?.maxCellTemp, 1, ' °C')}</DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3">
                                <Label text="Min Cell Temperature" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2">{formatNumber(data?.minCellTemp, 1, ' °C')}</DataCell>
                        </DataList>
                    </>
                }
            </Card>

        </div>
    )
}