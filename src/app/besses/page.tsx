'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import H1 from "@/components/Heading/H1"
import H3 from "@/components/Heading/H3"
import LineChart from "@/components/LineChart"
import Bess from "@/components/bess/Bess"
import { api } from "@/helpers/apiHelper"

async function getBessesData() {
    const res = await api('/battery/', 'GET');
    return res
}

async function getGraph1() {
    const res = await api('/graphdata3/', 'GET');
    return res
}

export default function Besses() {
    const [besses, setBesses] = useState<any>([]);

    const init = async () => {
        let data = await getBessesData()
        let graph1 = await getGraph1()
        setBesses(data)
    }

    useEffect(() => {
        init()
    }, []);


    return (
        <div>
            <H1 text="Bess Overview" />
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 mb-4 xl:mb-5">
                <Card className="mb-3 md:mb-0">
                    <H3 text="Current" />
                    <LineChart />
                </Card>
                <Card className="mb-3 md:mb-0">
                    <H3 text="State of charge" />
                    <LineChart />
                </Card>
                <Card className="mb-3 md:mb-0">
                    <H3 text="Power" />
                    <LineChart />
                </Card>
            </div >
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-5">
                {/* {besses && Object.keys(besses).map((index: any) => ( */}
                {besses && Object.entries(besses).map(([bessKey, bessValue]: [string, any]) => (
                    <>
                        <Link href={`/besses/${bessValue.bId}`}>
                            <Bess data={bessValue} />
                        </Link>
                    </>
                ))}
            </div>
        </div >
    )
}