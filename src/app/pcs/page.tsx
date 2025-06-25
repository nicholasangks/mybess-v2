'use client';

import { useEffect, useState } from "react"
import Label from "@/components/Label"
import PC from "@/components/bess/PC"
// import Grid from "@/components/bess/Grid"
// import { Table, TableThead, TableBody, TableRow, TableCell } from "@/components/Table"
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
            <div className="">
                <div className="md:grid lg:grid-cols-10 3xl:max-w-[1900px] gap-4 xl:gap-5">
                    <div className="md:col-span-7">
                        <PC data={pc} className="h-full" />
                    </div>
                    <div className="md:col-span-3">
                        {/* <Grid data={pcsControl} /> */}
                    </div>
                </div>
                <div className="grid grid-cols-10 w-full mt-5 overflow-x-scroll">
                    {/* <Table className="!w-[600px] lg:!w-full ">
                        <TableThead>
                            <TableRow className="!bg-transparent">
                                <TableCell></TableCell>
                                <TableCell className="text-center">L1</TableCell>
                                <TableCell className="text-center">L2</TableCell>
                                <TableCell className="text-center">L3</TableCell>
                            </TableRow>
                        </TableThead>
                        <TableBody>
                            <TableRow>
                                <TableCell><Label text="Voltage (V)" /></TableCell>
                                <TableCell className="text-center">{pc.voltageL1}</TableCell>
                                <TableCell className="text-center">{pc.voltageL2}</TableCell>
                                <TableCell className="text-center">{pc.voltageL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Current (A)" /></TableCell>
                                <TableCell className="text-center">{pc.currentL1}</TableCell>
                                <TableCell className="text-center">{pc.currentL2}</TableCell>
                                <TableCell className="text-center">{pc.currentL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Active Power (kW)" /></TableCell>
                                <TableCell className="text-center">{pc.activePowerL1}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL2}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Reactive Power (kVAR)" /></TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL1}</TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL2}</TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Apparent Power (kVA)" /></TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL1}</TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL2}</TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Power Factor" /></TableCell>
                                <TableCell className="text-center">{pc.powerFactorL1}</TableCell>
                                <TableCell className="text-center">{pc.powerFactorL2}</TableCell>
                                <TableCell className="text-center">{pc.powerFactorL3}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}

                    <div className="col-span-7">
                        <DataListWrapper>
                            <DataList cols={5}>
                                <DataCell withBgColor={true} className="col-span-3">
                                    <Label text="Voltage L1" />
                                </DataCell>
                                <DataCell withBgColor={true} className="justify-end col-span-2">
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
                                <DataCell withBgColor={true} className="col-span-3">
                                    <Label text="Voltage L3" />
                                </DataCell>
                                <DataCell withBgColor={true} className="justify-end col-span-2">
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
                                <DataCell withBgColor={true} className="col-span-3">
                                    <Label text="Current L2" />
                                </DataCell>
                                <DataCell withBgColor={true} className="justify-end col-span-2">
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
                                <DataCell withBgColor={true} className="col-span-3">
                                    <Label text="Active Power" />
                                </DataCell>
                                <DataCell withBgColor={true} className="justify-end col-span-2">
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
                                <DataCell withBgColor={true} className="col-span-3">
                                    <Label text="Power Factor" />
                                </DataCell>
                                <DataCell withBgColor={true} className="justify-end col-span-2">
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
                                <DataCell withBgColor={true} className="col-span-3">
                                    <Label text="IGBT Temperature L2" />
                                </DataCell>
                                <DataCell withBgColor={true} className="justify-end col-span-2">
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
                                <DataCell withBgColor={true} className="col-span-3">
                                    <Label text="Max Charging Power" />
                                </DataCell>
                                <DataCell withBgColor={true} className="justify-end col-span-2">
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

                    {/* <Table className="!w-[600px] lg:!w-full ">
                        <TableThead>
                            <TableRow className="!bg-transparent">
                                <TableCell></TableCell>
                                <TableCell className="text-center">L1</TableCell>
                                <TableCell className="text-center">L2</TableCell>
                                <TableCell className="text-center">L3</TableCell>
                            </TableRow>
                        </TableThead>
                        <TableBody>
                            <TableRow>
                                <TableCell><Label text="Voltage (V)" /></TableCell>
                                <TableCell className="text-center">{pc.voltageL1}</TableCell>
                                <TableCell className="text-center">{pc.voltageL2}</TableCell>
                                <TableCell className="text-center">{pc.voltageL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Current (A)" /></TableCell>
                                <TableCell className="text-center">{pc.currentL1}</TableCell>
                                <TableCell className="text-center">{pc.currentL2}</TableCell>
                                <TableCell className="text-center">{pc.currentL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Active Power (kW)" /></TableCell>
                                <TableCell className="text-center">{pc.activePowerL1}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL2}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Reactive Power (kVAR)" /></TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL1}</TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL2}</TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Apparent Power (kVA)" /></TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL1}</TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL2}</TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Power Factor" /></TableCell>
                                <TableCell className="text-center">{pc.powerFactorL1}</TableCell>
                                <TableCell className="text-center">{pc.powerFactorL2}</TableCell>
                                <TableCell className="text-center">{pc.powerFactorL3}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}
                </div>
            </div>
        </ContentWrapper>
    )
}