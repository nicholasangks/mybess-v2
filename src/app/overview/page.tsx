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
                <div className="relative w-[680px] h-[396px] mt-10 mb-6 mx-auto">
                    <img src={`/images/overview-vector.png`} alt="" className="absolute w-full h-full mx-auto z-10" />
                    {themeReady
                        ? <img src={`/images/overview-grid-base${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-full h-full mx-auto" />
                        : <img src={`/images/overview-grid-base.png`} alt="" className="w-full h-full mx-auto" />
                    }
                    {/* Grid to bess */}
                    <div className="flex absolute top-[200px] left-[256px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-x-hidden">
                        <motion.div
                            className="absolute w-4 h-full bg-[#abab00] dark:bg-[#FFFF00]"
                            initial={{ x: -10 }}
                            animate={{ x: 100 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                        ></motion.div>
                    </div>


                    {/* to end user */}
                    <div className="absolute top-[190px] left-[380px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-hidden">
                        <motion.div
                            className="absolute w-4 h-full bg-color-third dark:bg-color-third-dark"
                            initial={{ x: -10 }}
                            animate={{ x: 100 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                        ></motion.div>

                        {/* Solar */}
                        <motion.div
                            className="absolute w-4 h-full bg-[#8080ff] dark:bg-[#dadaff]"
                            initial={{ x: -15 }}
                            animate={{ x: 100 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay: 2 }}
                        ></motion.div>
                    </div>

                    {/* pv */}
                    <div className="absolute top-[120px] left-[396px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-hidden">
                        <motion.div
                            className="w-4 h-full bg-[#8080ff] dark:bg-[#dadaff]"
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

                        {/* pv */}
                        <div
                            className="absolute top-[32px] w-full h-[82px] bg-[#D2D2D2] dark:bg-[#8E8E8E] overflow-y-hidden">
                            <motion.div
                                className="absolute w-full h-4 bg-[#8080ff] dark:bg-[#dadaff]"
                                initial={{ y: -15 }}
                                animate={{ y: 82 }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay: 0.8 }}
                            ></motion.div>
                        </div>

                        {/* pv */}
                        {/* <motion.div
                            className="absolute w-full h-4 bg-color-third dark:bg-[#dadaff] z-10"
                            initial={{ y: 82 }}
                            animate={{ y: 250 }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity, delay: 1.6 }}
                        ></motion.div> */}

                        {/* Grid to bess */}
                        <div
                            className="absolute bottom-[36px] w-full h-[50px] bg-[#D2D2D2] dark:bg-[#8E8E8E] overflow-y-hidden">
                            <motion.div
                                className="absolute w-full h-4 bg-[#abab00] dark:bg-[#FFFF00]"
                                // initial={{ y: 173 }}
                                // animate={{ y: 250 }}
                                initial={{ y: -20 }}
                                animate={{ y: 100 }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay: 0.8 }}
                            ></motion.div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex md:hidden items-center justify-center mb-10 md:mb-0 text-center">
                <HiArrowLongLeft className="w-6 h-6 text-color-foreground-light dark:text-color-foreground-light-dark" />
                <Label text="Swipe to view" className="mx-3" />
                <HiArrowLongRight className="w-6 h-6 text-color-foreground-light dark:text-color-foreground-light-dark" />
            </div>

            <div className="w-full mt-6 overflow-x-scroll">
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
                                            <div className="w-12 h-1 mr-2 bg-[#bfbfbf] dark:bg-color-fifth-dark">
                                                <div className={`h-full ${parseInt(bessValue.SOC) < 50 ? "bg-color-fourth dark:bg-color-fourth-dark" : "bg-color-third dark:bg-color-third-dark"}`} style={{ width: parseInt(bessValue.SOC) + '%' }}></div>
                                            </div>
                                            {bessValue.SOC}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div className="relative w-12 h-1 mr-2 bg-[#bfbfbf] dark:bg-color-fifth-dark">
                                                <div className={`h-full ${parseInt(bessValue.SOH) < 50 ? "bg-color-fourth dark:bg-color-fourth-dark" : "bg-color-third dark:bg-color-third-dark"}`} style={{ width: parseInt(bessValue.SOH) + '%' }}></div>
                                            </div>
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
        </div >
    )
}