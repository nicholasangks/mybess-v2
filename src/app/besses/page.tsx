'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import ContentWrapper from "@/components/ContentWrapper";
import Label from "@/components/Label";
import Bess from "@/components/bess/Bess"
import { api } from "@/helpers/apiHelper"
import useSWR from "swr";
import { formatNumber } from '@/helpers/formatters';
import { LuArrowUpRight } from "react-icons/lu";
import { API_REFRESH_INTERVAL } from "@/constants/common";
import BatteryBar from "@/components/BatteryBar";

async function getBessesData() {
    const res = await api('/batterydata/', 'GET');
    return res
}

async function getBess1Data() {
    const res = await api('/bess1data/', 'GET');
    return res
}

export default function Besses() {
    const [besses, setBesses] = useState<any>([]);
    const [bess1, setBess1] = useState<any>([]);

    const { data: bessesData, error: bessesError } = useSWR('bessData', getBessesData, { refreshInterval: API_REFRESH_INTERVAL });
    const { data: bess1Data, error: bess1Error } = useSWR('bess1Data', getBess1Data, { refreshInterval: API_REFRESH_INTERVAL });

    useEffect(() => {
        setBesses(bessesData);
        setBess1(bess1Data)
    }, [bessesData, bess1Data]);

    return (
        <ContentWrapper title="Battery System">
            {/* Top */}
            <div className="grid md:grid-cols-12 gap-3 mb-3">
                <Card className="md:col-span-7">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                        <div>
                            <Label text="Battery Status" />
                            <div>{bess1?.chargeDischargeState ?? '-'}</div>
                        </div>
                        <div>
                            <Label text="SOC" />
                            <div className="flex items-center">
                                <div className="mr-2">{formatNumber(bess1?.SOC, 1, ' %')}</div>
                                <BatteryBar percentage={Number(bess1?.SOC) || 0} />
                            </div>
                        </div>
                        <div>
                            <Label text="SOH" />
                            <div className="flex items-center">
                                <div className="mr-2">{formatNumber(bess1?.SOH, 1, ' %')}</div>
                                <BatteryBar percentage={Number(bess1?.SOH) || 0} />
                            </div>
                        </div>
                        <div>
                            <Label text="Total Power" />
                            <div>{formatNumber(bess1?.power, 1, ' kW')}</div>
                        </div>
                        <div>
                            <Label text="Total Bus Voltage" />
                            <div>{formatNumber(bess1?.busVoltage, 1, ' v')}</div>
                        </div>
                        <div>
                            <Label text="Total Bus Current" />
                            <div>{formatNumber(bess1?.busCurrent, 1, ' A')}</div>
                        </div>
                        <div>
                            <Label text="Connection Status" />
                            <div>{bess1?.runningStatus ?? '-'}</div>
                        </div>
                        <div>
                            <Label text="Alarm" />
                            <Link href="/alarms?type=BMS" className="flex items-center cursor-pointer">
                                {bess1?.totalAlarmCount ?? '-'}
                                <LuArrowUpRight className="ml-2 text-muted-foreground" />
                            </Link>
                        </div>
                    </div>
                </Card>
                <Card className="grid grid-cols-2 md:col-span-5 gap-3">
                    <div>
                        <Label text="Chargeable" />
                        <Label text="Energy" />
                        <div>{formatNumber(bess1?.chargeCapacity, 1, ' kWh')}</div>
                    </div>
                    <div>
                        <Label text="Accumulated" />
                        <Label text="Discharging Energy" />
                        <div>{formatNumber(bess1?.dischargeCapacity, 1, ' kWh')}</div>
                    </div>
                    <div>
                        <Label text="Dischargeable" />
                        <Label text="Energy" />
                        <div>{formatNumber(bess1?.accumulatedChargeEnergy, 1, ' kWh')}</div>
                    </div>
                    <div>
                        <Label text="Accumulated" />
                        <Label text="Charging Energy" />
                        <div>{formatNumber(bess1?.accumulatedDischargeEnergy, 1, ' kWh')}</div>
                    </div>
                </Card>
            </div>


            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-3">
                {besses && Object.entries(besses).map(([bessKey, bessValue]: [string, any]) => (
                    <div key={bessKey}>
                        <Link href={`/besses/${bessValue.bId}`}>
                            <Bess data={bessValue} />
                        </Link>
                    </div>
                ))}
            </div>
        </ContentWrapper >
    )
}