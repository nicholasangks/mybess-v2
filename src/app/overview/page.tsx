'use client'

import { useState, useEffect } from "react"
import { useTheme } from "next-themes";
import Link from "next/link"
import H1 from "@/components/Heading/H1"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"
import Card from "@/components/Card"
import { Table, TableThead, TableBody, TableRow, TableCell } from "@/components/Table"
import { api } from "@/helpers/apiHelper"
import { GiElectric } from "react-icons/gi";
import PC from "@/components/bess/PC"

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
            {themeReady
                ? <img src={`/images/overview${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="mx-auto mt-10" />
                : <img src={`/images/overview.png`} alt="" className="mx-auto mt-10" />
            }
            {/* <img src="/images/overview-white.png" alt="" className="mx-auto mt-12" /> */}

            <div className="mt-8">
                <Table className="w-full ">
                    <TableThead>
                        <TableRow className="!bg-transparent">
                            <TableCell>Bess Id</TableCell>
                            <TableCell>SOC (%)</TableCell>
                            <TableCell>SOH (%)</TableCell>
                            <TableCell>Charge Capacity (kW)</TableCell>
                            <TableCell>Discharge Capacity (kW)</TableCell>
                            <TableCell>Power (kW)</TableCell>
                            <TableCell>Total Current (kW)</TableCell>
                            <TableCell>Total Voltage (kW)</TableCell>
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
            <div className="grid grid-cols-10 gap-5 mt-8">
                <div className="col-span-6">
                    <PC data={pc} className="h-full" />
                </div>
                <div className="grid grid-cols-2 gap-4 col-span-4">
                    <Card className="relative overflow-hidden">
                        <img src="/images/bess-no-grid.png" alt="" className="absolute -right-5 -bottom-7 w-[45%]" />
                        <Label text="Number of Bess" />
                        <div className="!mb-0">{info.numberOfBess}</div>
                    </Card>
                    <Card className="relative overflow-hidden">
                        <img src="/images/cluster-no-grid.png" alt="" className="absolute -right-5 -bottom-7 w-[45%]" />
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