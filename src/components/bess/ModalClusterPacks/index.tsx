import { useState, useEffect } from 'react';
import React from 'react';
import Modal from '@/components/Modal';
import H3 from '@/components/Heading/H3';
import Label from '@/components/Label';
import Battery from '../Battery';
import { api } from '@/helpers/apiHelper';

interface ModalClusterPacksProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    cId: string; // example cluster1
}

async function getPacksData(cId: string) {

    const res = await api('/battery/', 'GET');
    const packs = [];

    if (res.hasOwnProperty("bess1")) {
        const bessData = res["bess1"];

        if (bessData.hasOwnProperty(cId)) {
            const clusterData = bessData[cId];

            for (const key in clusterData) {
                if (key.startsWith("pack")) {
                    packs.push(clusterData[key]);
                }
            }
        }
    }

    return packs;
}

async function getClusterData(cId: string) {
    const res = await api(`/bess1/${cId}/`, 'GET');
    return res;
}

export default function ModalCusterPacks({ open, setOpen, cId }: ModalClusterPacksProps) {
    const [cluster, setCluster] = useState<any>({})
    const [packs, setPacks] = useState<any>([])

    const init = async () => {
        let _cluster = await getClusterData(cId)
        let _packs = await getPacksData(cId)

        // console.log(cId)
        // console.log(_packs)

        setCluster(_cluster)
        setPacks(_packs)
    }

    useEffect(() => {
        if (open) {
            init()
        }
    }, [open]);

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="sticky top-0 lg:flex lg:items-center h-auto lg:h-12 px-4 lg:px-0 py-4 lg:py-0 z-50 border-b border-gray-300 dark:border-gray-600 bg-color-background dark:bg-color-background-dark">
                <div className="lg:flex items-center justify-between w-[1000px] mx-auto">
                    <H3 text={`${cId}`} className="!mb-0 capitalize" />
                    <div className="lg:flex items-center">
                        <div className="mr-5">Max cell voltage: {cluster.maxCellVoltage} V</div>
                        <div className="mr-5">Max cell temperature: {cluster.maxCellTemperature} °C</div>
                        <div>Alarm: {cluster.alarmCount}</div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-[900px] xl:w-[1000px] mt-4 mx-auto px-4 lg:px-0 py-2 lg:py-8">
                {
                    packs.map((pack: any, index: number) => (
                        <div key={index} className="mb-10 lg:mb-12">
                            <div className="lg:flex items-center justify-between mb-5 ">
                                <H3 text={`Pack ${pack.pId}`} className="!mb-0" />
                                <div className="lg:flex items-center">
                                    <div className="mr-5">
                                        <Label text={`Min Cell Voltage ${pack.minCellVoltage} V`} />
                                    </div>
                                    <div>
                                        <Label text={`Max Cell Voltage ${pack.maxCellVoltage} V`} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 lg:grid-cols-8 gap-2 lg:gap-4">
                                {
                                    pack.cellsVoltage.map((cell: any, index: number) => (
                                        <Battery
                                            key={index}
                                            voltage={cell}
                                            temperature={pack.cellsTemperature[index]}
                                        />
                                    ))
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className="sticky bottom-6 left-0 right-0 w-20 mx-auto py-1 bg-color-second dark:bg-color-second-dark text-center rounded-full cursor-pointer"
                onClick={() => setOpen(false)}>Close</div>
        </Modal>
    )
}