'use client';

import { useState, useEffect } from 'react';
import ContentWrapper from '@/components/ContentWrapper';
import ModalCusterPacks from '@/components/bess/ModalClusterPacks';
import Bess from "@/components/bess/Bess"
import Cluster from '@/components/bess/Cluster';
import { api } from '@/helpers/apiHelper';

async function getBessData() {
    const res = await api('/bess1data/', 'GET');
    return res
}

async function getClusters() {
    const res = await api('/batterydata/', 'GET');

    const clusters = [];
    if (res.hasOwnProperty("bess1")) {
        const bess1Data = res["bess1"];
        for (const key in bess1Data) {
            if (key.startsWith("cluster")) {
                clusters.push(bess1Data[key]);
            }
        }
    }

    return clusters
}

export default function BessDetails({ params }: { params: { slug: string } }) {
    const [openClusterModal, setOpenClusterModal] = useState(false)
    const [bess, setBess] = useState<any>([])
    const [clusters, setClusters] = useState<any>([])
    const [cId, setCId] = useState<string>('')

    const handleModalPacks = (cId: any) => {
        setCId('cluster' + cId)
        setOpenClusterModal(true)
    }

    const init = async () => {
        let _bess = await getBessData()
        let _clusters = await getClusters()

        setBess(_bess)
        setClusters(_clusters)
    }

    useEffect(() => {
        init()
    }, []);

    return (
        <ContentWrapper title="Battery System">
            <ModalCusterPacks open={openClusterModal} setOpen={setOpenClusterModal} cId={cId} />
            <div className="md:grid md:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-3">
                <div className="md:col-span-1">
                    <Bess data={bess} withClusterVoltage={true} />
                </div>
                <div className="md:col-span-2 3xl:col-span-3 3xl:max-w-[700px]">
                    {clusters.map((cluster: any, index: number) => {
                        return <Cluster
                            onClick={() => handleModalPacks(cluster.cId)}
                            key={index}
                            data={cluster}
                        />
                    })}
                </div>
            </div>
        </ContentWrapper>
    )
}