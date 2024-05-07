'use client'

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import H1 from "@/components/Heading/H1"
import Label from "@/components/Label"
import Card from "@/components/Card"
import { Table, TableThead, TableBody, TableRow, TableCell } from "@/components/Table"
import { api } from "@/helpers/apiHelper"
import { GiElectric } from "react-icons/gi";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import PC from "@/components/bess/PC"
import { motion } from "framer-motion";

async function getGeneralInfo() {
    const res = await api('/generalinfo/', 'GET');
    return res
}

async function getBessesData() {
    const res = await api('/battery/', 'GET');
    return res
}

async function getPcsData() {
    const res = await api('/pcsdata/', 'GET');
    return res
}

export default function Overview() {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();
    const [info, setInfo] = useState<any>([]);
    const [besses, setBesses] = useState<any>([]);
    const [pc, setPc] = useState<any>([]);

    const init = async () => {
        let generalInfo = await getGeneralInfo()
        let bessesData = await getBessesData()
        let pcData = await getPcsData()

        setInfo(generalInfo)
        setBesses(bessesData)
        setPc(pcData)
    }

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    useEffect(() => {
        init()
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between">
                <H1 text="Bess Site Overview" className="!mb-0" />
                <div>Alarm: 0</div>
            </div>

            <div className="w-full overflow-x-scroll">
                <div className="relative w-[680px] h-[396px] mt-10 mb-10 mx-auto">
                    {/* {themeReady
                    ? <img src={`/images/overview${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-full h-auto mx-auto mt-10" />
                    : <img src={`/images/overview.png`} alt="" className="mx-auto mt-10" />
                } */}
                    <img src={`/images/overview-vector.png`} alt="" className="absolute w-full h-full mx-auto z-10" />
                    {themeReady
                        ? <img src={`/images/overview-grid-base${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-full h-full mx-auto" />
                        : <img src={`/images/overview-grid-base.png`} alt="" className="w-full h-full mx-auto" />
                    }
                    <div className="flex absolute top-[200px] left-[254px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-x-hidden">
                        <motion.div
                            className="absolute w-4 h-full bg-color-third dark:bg-color-third-dark"
                            initial={{ x: -10 }}
                            animate={{ x: 100 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                        ></motion.div>

                        {/* <motion.div
                        className="absolute w-4 h-full bg-[#5d70d1]"
                        initial={{ x: 100 }}
                        animate={{ x: -10 }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    ></motion.div> */}
                    </div>

                    <div className="absolute top-[190px] left-[380px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-hidden">
                        <motion.div
                            className="w-4 h-full bg-color-third dark:bg-color-third-dark"
                            initial={{ x: -10 }}
                            animate={{ x: 100 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                        ></motion.div>
                    </div>

                    <div className="absolute top-[120px] left-[396px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-hidden">
                        <motion.div
                            className="w-4 h-full bg-color-third dark:bg-color-third-dark"
                            initial={{ x: -10 }}
                            animate={{ x: 100 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                        ></motion.div>
                    </div>


                    <div className="absolute top-[50px] left-[360px] w-[2.5px] h-[280px] bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[60deg] overflow-hidden">
                        <motion.div
                            className="w-full h-4 bg-color-third dark:bg-color-third-dark"
                            initial={{ y: 300 }}
                            animate={{ y: 110 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        ></motion.div>
                    </div>
                </div>
            </div>

            <div className="flex md:hidden items-center justify-center mb-10 md:mb-0 text-center">
                <HiArrowLongLeft className="w-6 h-6 text-color-foreground-light dark:text-color-foreground-light-dark" />
                <Label text="Swipe to view" className="mx-3" />
                <HiArrowLongRight className="w-6 h-6 text-color-foreground-light dark:text-color-foreground-light-dark" />
            </div>

            <div className="w-full mt-8 overflow-x-scroll">
                <Table className="!w-[1200px] lg:!w-full">
                    <TableThead>
                        <TableRow className="!bg-transparent">
                            <TableCell>Bess Id</TableCell>
                            <TableCell>SOC (%)</TableCell>
                            <TableCell>SOH (%)</TableCell>
                            <TableCell>Charge Capacity (kWh)</TableCell>
                            <TableCell>Discharge Capacity (kWh)</TableCell>
                            <TableCell>Power (kW)</TableCell>
                            <TableCell>Total Current (A)</TableCell>
                            <TableCell>Total Voltage (V)</TableCell>
                        </TableRow>
                    </TableThead>
                    <TableBody>
                        {besses && Object.entries(besses).map(([bessKey, bessValue]: [string, any]) => (
                            <>
                                {/* <Link href={`/besses/${bessValue.bId}`} className="absolute w-full h-full"></Link> */}
                                <TableRow>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <GiElectric className={`w-5 h-5 mr-1 ${bessValue.runningStatus === 'Idle' ? "fill-color-fifth dark:fill-color-fifth-dark" : "fill-color-third dark:fill-color-third-dark"}`} />
                                            {bessValue.bId}
                                        </div></TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div className="w-12 h-1 mr-2 bg-color-third"></div>
                                            {bessValue.SOC}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div className="w-12 h-1 mr-2 bg-color-third"></div>
                                            {bessValue.SOH}
                                        </div>
                                    </TableCell>
                                    <TableCell>{bessValue.chargeCapacity}</TableCell>
                                    <TableCell>{bessValue.dischargeCapacity}</TableCell>
                                    <TableCell>{bessValue.power}</TableCell>
                                    <TableCell>{bessValue.totalCurrent}</TableCell>
                                    <TableCell>{bessValue.totalVoltage}</TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="lg:grid lg:grid-cols-10 gap-5 mt-8">
                <div className="lg:col-span-6">
                    <PC data={pc} className="h-full" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 lg:col-span-4 mt-4 lg:mt-0">
                    <Card className="relative min-h-[120px] lg:min-h-0 overflow-hidden">
                        <img src="/images/bess-no-grid.png" alt="" className="absolute -right-7 -bottom-9 3xl:-right-9 3xl:-bottom-11 w-[50%] xl:max-w-[100px] 2xl:max-w-[110px] 3xl:max-w-[130px]" />
                        <Label text="Number of Bess" />
                        <div className="!mb-0">{info.numberOfBess}</div>
                    </Card>
                    <Card className="relative min-h-[120px] lg:min-h-0 overflow-hidden">
                        <img src="/images/cluster-no-grid.png" alt="" className="absolute -right-7 -bottom-9 3xl:-right-9 3xl:-bottom-11 w-[50%] xl:max-w-[100px] 2xl:max-w-[110px] 3xl:max-w-[130px]" />
                        <Label text="Number of Cluster" />
                        <div>{info.numberOfCluster}</div>
                    </Card>
                    <Card>
                        <Label text="Number of Pack" />
                        <div>{info.numberOfPack}</div>
                    </Card>
                    <Card>
                        <Label text="Number of Cell" />
                        <div>{info.numberOfCell}</div>
                    </Card>
                </div>
            </div>
        </div>
    )
}