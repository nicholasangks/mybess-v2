'use client';

import { useEffect, useState } from "react"
import H1 from "@/components/Heading/H1"
import Label from "@/components/Label"
import PC from "@/components/bess/PC"
import Grid from "@/components/bess/Grid"
import { Table, TableThead, TableBody, TableRow, TableCell } from "@/components/Table"
import { api } from "@/helpers/apiHelper"

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

    const init = async () => {
        let _pc = await getPcData()
        let _pcsControl = await getPcsControl()

        setPc(_pc)
        setPcsControl(_pcsControl)
    }

    useEffect(() => {
        init()
    }, []);

    return (
        <div>
            <H1 text="PC Overview" />
            <div className="">
                <div className="md:grid lg:grid-cols-10 gap-4 xl:gap-5">
                    <div className="md:col-span-7">
                        <PC data={pc} className="h-full" />
                    </div>
                    <div className="md:col-span-3">
                        <Grid data={pcsControl} />
                    </div>
                </div>
                <div className="w-full mt-5 overflow-x-scroll">
                    <Table className="!w-[600px] lg:!w-full ">
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
                                <TableCell><Label text="Voltage" /></TableCell>
                                <TableCell className="text-center">{pc.voltageL1}</TableCell>
                                <TableCell className="text-center">{pc.voltageL2}</TableCell>
                                <TableCell className="text-center">{pc.voltageL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Current voltage (kW)" /></TableCell>
                                <TableCell className="text-center">{pc.currentL1}</TableCell>
                                <TableCell className="text-center">{pc.currentL2}</TableCell>
                                <TableCell className="text-center">{pc.currentL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Total Active Power (kVAR)" /></TableCell>
                                <TableCell className="text-center">{pc.activePowerL1}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL2}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Reactive Power" /></TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL1}</TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL2}</TableCell>
                                <TableCell className="text-center">{pc.reactivePowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Active Power" /></TableCell>
                                <TableCell className="text-center">{pc.activePowerL1}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL2}</TableCell>
                                <TableCell className="text-center">{pc.activePowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Apparent Power" /></TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL1}</TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL2}</TableCell>
                                <TableCell className="text-center">{pc.apparentPowerL3}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Label text="Power factor" /></TableCell>
                                <TableCell className="text-center">{pc.powerFactorL1}</TableCell>
                                <TableCell className="text-center">{pc.powerFactorL2}</TableCell>
                                <TableCell className="text-center">{pc.powerFactorL3}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}