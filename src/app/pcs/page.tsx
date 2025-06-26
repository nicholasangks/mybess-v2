'use client';

import { useEffect, useState } from "react"
import Label from "@/components/Label"
import PC from "@/components/bess/PC"
import { api } from "@/helpers/apiHelper"
import useSWR from "swr";
import { DataListWrapper, DataList, DataCell } from "@/components/DataList"
import { formatNumber } from '@/helpers/formatters';
import { API_REFRESH_INTERVAL } from "@/constants/common";
import ContentWrapper from "@/components/ContentWrapper";

async function getPcData() {
    const res = await api('/pcsdata/', 'GET');
    return res
}

async function getPcsControl() {
    const res = await api('/pcsctrl/', 'GET');
    return res
}

export default function Pcs() {
    const [pc, setPc] = useState<any>([])
    const [pcsControl, setPcsControl] = useState<any>([])

    const { data: pcsData, error: pcsError } = useSWR('pcsData', getPcData, { refreshInterval: API_REFRESH_INTERVAL });
    const { data: pcsControlData, error: pcsControlError } = useSWR('pcsControl', getPcsControl, { refreshInterval: API_REFRESH_INTERVAL });

    useEffect(() => {
        if (pcsData && pcsControlData) {
            setPc(pcsData)
            setPcsControl(pcsControlData)
        }
    }, [pcsData, pcsControlData]);

    return (
        <ContentWrapper title="PCS">
            <div className="max-w-[850px] mt-12 mx-auto">
                <div>
                    <PC data={pc} className="h-full" />
                </div>
                <div className="mt-8">
                    <DataListWrapper>
                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3 !bg-secondary">
                                <Label text="Voltage L1" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2 !bg-secondary">
                                {formatNumber(pc?.voltageL1, 1, ' V')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="Voltage L2" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">
                                {formatNumber(pc?.voltageL2, 1, ' V')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3 !bg-secondary">
                                <Label text="Voltage L3" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2 !bg-secondary">
                                {formatNumber(pc?.voltageL3, 1, ' V')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="Current L1" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">
                                {formatNumber(pc?.currentL1, 1, ' A')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3 !bg-secondary">
                                <Label text="Current L2" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2 !bg-secondary">
                                {formatNumber(pc?.currentL2, 1, ' A')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="Current L3" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">
                                {formatNumber(pc?.currentL3, 1, ' A')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3 !bg-secondary">
                                <Label text="Active Power" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2 !bg-secondary">
                                {formatNumber(pc?.totalActivePower, 1, ' kW')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="Reactive Power" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">
                                {formatNumber(pc?.totalReactivePower, 1, ' kVAR')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3 !bg-secondary">
                                <Label text="Power Factor" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2 !bg-secondary">
                                {formatNumber(pc?.totalPowerFactor, 2)}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="IGBT Temperature L1" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">
                                {formatNumber(pc?.igbtTempA, 1, ' ℃')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3 !bg-secondary">
                                <Label text="IGBT Temperature L2" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2 !bg-secondary">
                                {formatNumber(pc?.igbtTempB, 1, ' ℃')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="IGBT Temperature L3" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">
                                {formatNumber(pc?.igbtTempC, 1, ' ℃')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell withBgColor={true} className="col-span-3 !bg-secondary">
                                <Label text="Max Charging Power" />
                            </DataCell>
                            <DataCell withBgColor={true} className="justify-end col-span-2 !bg-secondary">
                                {formatNumber(pc?.maxChargePower, 1, ' kW')}
                            </DataCell>
                        </DataList>

                        <DataList cols={5}>
                            <DataCell className="col-span-3">
                                <Label text="Max Discharging Power" />
                            </DataCell>
                            <DataCell className="justify-end col-span-2">
                                {formatNumber(pc?.maxDischargePower, 1, ' kW')}
                            </DataCell>
                        </DataList>
                    </DataListWrapper>
                </div>
            </div>
        </ContentWrapper>
    )
}