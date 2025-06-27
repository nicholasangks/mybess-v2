'use client'

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import H2 from "@/components/Heading/H2"
import H3 from "@/components/Heading/H3"
import Label from "@/components/Label"
import Card from "@/components/Card"
import { api } from "@/helpers/apiHelper"
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useSWR from 'swr';
import SocChart from "@/components/charts/SocChart"
import PowerChart from "@/components/charts/PowerChart"
import BarIndicator from "@/components/BarIndicator"
import { LuArrowUpRight } from "react-icons/lu";
import { formatNumber } from '@/helpers/formatters';
import { API_REFRESH_INTERVAL } from "@/constants/common"
import ContentWrapper from "@/components/ContentWrapper"


async function getBess1Data() {
    const res = await api('/bess1data/', 'GET');
    return res
}

async function getPcsData() {
    const res = await api('/pcsdata/', 'GET');
    return res
}

async function getSocData() {
    const res = await api('/soc/', 'GET');
    return res
}

async function getPowerData() {
    const res = await api('/power/', 'GET');
    return res
}

async function getAlarmSummaryData() {
    const res = await api('/alarmSummary/', 'GET');
    return res
}

// To be delete
const mockSocData = [
    { timestamp: "00:00", soc: 0.0 },
    { timestamp: "00:10", soc: 2.0 },
    { timestamp: "00:20", soc: 3.0 },
    { timestamp: "00:30", soc: 2.0 },
    { timestamp: "00:40", soc: 4.0 },
];

// To be delete
const mockPowerData = [
    { timestamp: "00:00", power: 0.0 },
    { timestamp: "00:10", power: 1.0 },
    { timestamp: "00:20", power: 4.0 },
    { timestamp: "00:30", power: 6.0 },
    { timestamp: "00:40", power: 3.0 },
];

export default function Overview() {
    const [themeReady, setThemeReady] = useState(false);
    const { theme } = useTheme();
    const [info, setInfo] = useState<any>([]);
    const [besses, setBesses] = useState<any>([]);
    const [pc, setPc] = useState<any>([]);
    const [soc, setSoc] = useState<any>([]);
    const [power, setPower] = useState<any>([]);
    const [alarmSummary, setAlarmSummary] = useState<any>([]);
    const [bess1, setBess1] = useState<any>([]);

    const { data: pcData, error: pcDataError } = useSWR('pcsData', getPcsData, { refreshInterval: API_REFRESH_INTERVAL });
    const { data: socData, error: socDataError } = useSWR('socData', getSocData, { fallbackData: mockSocData, refreshInterval: API_REFRESH_INTERVAL });
    const { data: powerData, error: powerDataError } = useSWR('powerData', getPowerData, { fallbackData: mockPowerData, refreshInterval: API_REFRESH_INTERVAL });
    const { data: alarmSummaryData, error: alarmSummaryDataError } = useSWR('alarmSummary', getAlarmSummaryData, { refreshInterval: API_REFRESH_INTERVAL });
    const { data: bess1Data, error: bess1DataError } = useSWR('bess1Data', getBess1Data, { refreshInterval: API_REFRESH_INTERVAL });

    useEffect(() => {
        // if (generalInfo && bessesData && pcData) {
        setPc(pcData);
        setSoc(socData);
        setPower(powerData);
        setAlarmSummary(alarmSummaryData);
        setBess1(bess1Data);
        // }
    }, [pcData, socData, powerData, alarmSummaryData, bess1Data]);

    useEffect(() => {
        if (theme !== undefined) {
            setThemeReady(true);
        }
    }, [theme]);

    return (
        <ContentWrapper title="Bess Site Overview">
            <div className="md:grid md:grid-cols-10 md:gap-3">
                {/* Flow Diagram */}
                <div className="md:col-span-7 md:flex md:items-center w-full overflow-x-scroll">
                    <div className="relative w-[680px] h-[396px] mt-10 mb-6 mx-auto">
                        <img src={`/images/overview-vector-2.png`} alt="" className="absolute w-full h-full mx-auto z-10" />
                        {themeReady
                            ? <img src={`/images/overview-grid-base${theme === 'dark' ? '-dark.png' : '.png'}`} alt="" className="w-full h-full mx-auto" />
                            : <img src={`/images/overview-grid-base.png`} alt="" className="w-full h-full mx-auto" />
                        }
                        {/* Grid to bess */}
                        <div className="flex absolute top-[200px] left-[256px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-x-hidden">
                            <motion.div
                                className="absolute w-4 h-full bg-accent-a"
                                initial={{ x: -10 }}
                                animate={{ x: 100 }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                            ></motion.div>
                        </div>


                        {/* to end user */}
                        <div className="absolute top-[190px] left-[380px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-hidden">
                            <motion.div
                                className="absolute w-4 h-full bg-accent-b"
                                initial={{ x: -10 }}
                                animate={{ x: 100 }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                            ></motion.div>

                            {/* Solar */}
                            <motion.div
                                className="absolute w-4 h-full bg-accent-c"
                                initial={{ x: -15 }}
                                animate={{ x: 100 }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay: 2 }}
                            ></motion.div>
                        </div>

                        {/* pv */}
                        <div className="absolute top-[120px] left-[396px] w-[62px] h-[2.5px] mx-auto bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[30deg] overflow-hidden">
                            <motion.div
                                className="w-4 h-full bg-accent-c"
                                initial={{ x: -10 }}
                                animate={{ x: 100 }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                            ></motion.div>
                        </div>


                        <div className="absolute top-[50px] left-[360px] w-[2.5px] h-[280px] bg-[#D2D2D2] dark:bg-[#8E8E8E] rotate-[60deg] overflow-hidden">
                            {/* bess to end user */}
                            <motion.div
                                className="w-full h-4 bg-accent-b"
                                initial={{ y: 210 }}
                                animate={{ y: 110 }}
                                transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
                            ></motion.div>

                            {/* pv */}
                            <div
                                className="absolute top-[32px] w-full h-[82px] bg-[#D2D2D2] dark:bg-[#8E8E8E] overflow-y-hidden">
                                <motion.div
                                    className="absolute w-full h-4 bg-accent-c"
                                    initial={{ y: -15 }}
                                    animate={{ y: 82 }}
                                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay: 0.8 }}
                                ></motion.div>
                            </div>

                            {/* Grid to bess */}
                            <div
                                className="absolute bottom-[36px] w-full h-[50px] bg-[#D2D2D2] dark:bg-[#8E8E8E] overflow-y-hidden">
                                <motion.div
                                    className="absolute w-full h-4 bg-accent-a"
                                    initial={{ y: -20 }}
                                    animate={{ y: 100 }}
                                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay: 0.8 }}
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex md:hidden items-center justify-center mb-10 md:mb-0 text-center">
                    <FiArrowLeft className="w-6 h-6 text-muted-foreground" />
                    <Label text="Swipe to view" className="mx-3" />
                    <FiArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>

                {/* Graph */}
                <Card className="md:col-span-3">
                    <div className="mb-6">
                        <SocChart data={socData} />
                    </div>
                    <div>
                        <PowerChart data={powerData} />
                    </div>
                </Card>
            </div>


            {/* Status of overall system */}
            <div className="md:grid md:grid-cols-10 md:gap-3 mt-3">
                <Card className="md:col-span-7">
                    <H2 text="Status of overall system" className="" />
                    <div className="md:grid md:grid-cols-2">
                        <div className="grid grid-cols-2 gap-3.5">
                            <div>
                                <Label text="Bess Status" />
                                <div className="text-primary">{bess1?.runningStatus ?? '-'}</div>
                            </div>
                            <div>
                                <Label text="Grid Mode" />
                                <div>{pc?.gridMode ?? '-'}</div>
                            </div>
                            <div>
                                <Label text="Total Power" />
                                <div>{formatNumber(bess1?.power, 1, ' kW')}</div>
                            </div>
                            <div>
                                <Label text="Total Current" />
                                <div>{formatNumber(bess1?.totalCurrent, 1, ' kW')}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3.5 mt-3.5 md:mt-0">
                            <div>
                                <Label text="SOC" />
                                <div className="mb-6">{formatNumber(bess1?.SOC, 1, ' %')}</div>
                                <BarIndicator percentage={bess1?.SOC ?? 0} />
                            </div>
                            <div>
                                <Label text="SOH" />
                                <div className="mb-6">{formatNumber(bess1?.SOH, 1, ' %')}</div>
                                <BarIndicator percentage={bess1?.SOH ?? 0} />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="md:col-span-3 mt-3 md:mt-0">
                    <div className="flex justify-between">
                        <H2 text="Alarms" className="" />
                        <Link href="/alarms">
                            <div className="flex items-center justify-center w-9 h-9 bg-background rounded-full cursor-pointer">
                                <LuArrowUpRight />
                            </div>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mt-3">
                        <div className="flex flex-col items-center justify-center">
                            {/* Gauge with number inside */}
                            <div className="relative w-full h-auto aspect-square">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    {/* Outer Circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="95"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        className="stroke-critical"
                                    />

                                    {/* Dashed Inner Circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeDasharray="2,30"
                                        strokeLinecap="round"
                                        transform="rotate(-90 100 100)"
                                        className="stroke-critical"
                                    />
                                </svg>

                                {/* Centered number */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="text-center">
                                            <Label text="Critical" />
                                            <H3 text={alarmSummary?.critical ?? '-'} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text below circle */}
                            {/* <p className="mt-2 text-sm text-white opacity-70">Critical</p> */}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            {/* Gauge with number inside */}
                            <div className="relative w-full h-auto aspect-square">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    {/* Outer Circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="95"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        className="stroke-major"
                                    />

                                    {/* Dashed Inner Circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeDasharray="2,30"
                                        strokeLinecap="round"
                                        transform="rotate(-90 100 100)"
                                        className="stroke-major"
                                    />
                                </svg>

                                {/* Centered number */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="text-center">
                                        <Label text="Major" />
                                        <H3 text={alarmSummary?.major ?? '-'} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col items-center justify-center">
                            {/* Gauge with number inside */}
                            <div className="relative w-full h-auto aspect-square">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    {/* Outer Circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="95"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        className="stroke-warning"
                                    />

                                    {/* Dashed Inner Circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeDasharray="2,30"
                                        strokeLinecap="round"
                                        transform="rotate(-90 100 100)"
                                        className="stroke-warning"
                                    />
                                </svg>

                                {/* Centered number */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="text-center">
                                        <Label text="Warning" />
                                        <H3 text={alarmSummary?.warning ?? '-'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </ContentWrapper >
    )
}