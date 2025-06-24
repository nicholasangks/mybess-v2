'use client';

import { useEffect, useState } from "react";
import H1 from "@/components/Heading/H1";
import H2 from "@/components/Heading/H2";
import Card from "@/components/Card";
import Label from "@/components/Label";
import { api } from "@/helpers/apiHelper"
import { LuPower } from "react-icons/lu";

type PcsControlData = {
    gridModeCtrl: string;
    onOff: string;
    onOffCtrl: string;
    activePowerCtrl: number;
    reactivePowerCtrl: number;
    powerFactorCtrl: number;
    remoteCtrl: string;
};

type SocData = {
    minSOC: number;
    maxSOC: number;
};

async function getPcsControl() {
    const res = await api('/pcsctrl/', 'GET');
    return res
}

async function getSoc() {
    const res = await api('/socmanagement/', 'GET');
    return res
}


export default function ControlPanel() {
    const [controlData, setControlData] = useState<PcsControlData | null>(null);
    const [socData, setSocData] = useState<SocData>({
        minSOC: 0,
        maxSOC: 0,
    });

    const init = async () => {
        let _controlData = await getPcsControl()
        let _socData = await getSoc()

        setControlData(_controlData)
        setSocData(_socData)
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <H1 text="Control Panel" />

            <div className="max-w-[750px] mt-[5rem] mx-auto">
                {/* <H2 text="Bess Site 1" /> */}
                {/* Left */}
                <div className="flex items-center">
                    <Label text="Operation" className="mr-3" />
                    <div className="flex items-center cursor-pointer">
                        <div className={`flex items-center justify-center w-[4rem] h-auto aspect-square mr-2 rounded-full border-[1.5px] border-white ${controlData?.onOff.toLowerCase() === 'off-2' ? 'border-primary' : 'border-muted dark:border-muted-d'}`}>
                            <div className={`flex items-center justify-center w-[80%] h-auto aspect-square rounded-full ${controlData?.onOff.toLowerCase() === 'off-2' ? 'bg-primary/30 blur-md' : 'bg-muted dark:bg-muted-d text-muted-foreground dark:text-muted-foreground-d'}`}>

                            </div>
                            <LuPower className="absolute text-xl" />
                        </div>
                        <div className={`font-medium ${controlData?.onOff.toLowerCase() === 'off-2' ? 'text-primary' : ' text-muted-foreground dark:text-muted-foreground'}`}>
                            {controlData?.onOff}
                        </div>
                    </div>
                </div>

                {/* Middle */}
                <div className="grid grid-cols-2 my-10 py-10 border-t border-b border-border dark:border-border-d">
                    <div className="border-r border-border dark:border-border-d pr-10">
                        <Label text="Control" />
                        <div className="grid grid-cols-2 gap-5 mt-4">
                            <div className={`flex items-center justify-center w-full h-auto aspect-square rounded-full border-[1.5px] ${controlData?.remoteCtrl.toLowerCase() === 'remote-mode' ? 'border-primary' : 'border-muted dark:border-muted-d'}`}>
                                <div className={`flex items-center justify-center w-[90%] h-auto aspect-square rounded-full ${controlData?.remoteCtrl.toLowerCase() === 'remote-mode' ? 'bg-primary/10 text-primary' : 'text-muted-foreground dark:text-muted-foreground-d'}`}>
                                    Remote
                                </div>
                            </div>
                            <div className={`flex items-center justify-center w-full h-auto aspect-square rounded-full border-[1.5px] ${controlData?.remoteCtrl.toLowerCase() === 'local-mode' ? 'border-primary' : 'border-muted dark:border-muted-d'}`}>
                                <div className={`flex items-center justify-center w-[90%] h-auto aspect-square rounded-full ${controlData?.remoteCtrl.toLowerCase() === 'local-mode' ? 'bg-primary/10 text-primary' : 'text-muted-foreground dark:text-muted-foreground-d'}`}>
                                    Local
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pl-10">
                        <Label text="Grid Mode" />
                        <div className="grid grid-cols-2 gap-5 mt-4">
                            <div className={`flex items-center justify-center w-full h-auto aspect-square rounded-full border-[1.5px] ${controlData?.gridModeCtrl.toLowerCase() === 'pq-mode' ? 'border-primary' : 'border-muted dark:border-muted-d'}`}>
                                <div className={`flex items-center justify-center w-[90%] h-auto aspect-square rounded-full ${controlData?.gridModeCtrl.toLowerCase() === 'pq-mode' ? 'bg-primary/10 text-primary' : 'text-muted-foreground dark:text-muted-foreground-d'}`}>
                                    PQ-Mode
                                </div>
                            </div>
                            <div className={`flex items-center justify-center w-full h-auto aspect-square rounded-full border-[1.5px] ${controlData?.gridModeCtrl.toLowerCase() === 'vf-mode' ? 'border-primary' : 'border-muted dark:border-muted-d'}`}>
                                <div className={`flex items-center justify-center w-[90%] h-auto aspect-square rounded-full ${controlData?.gridModeCtrl.toLowerCase() === 'vf-mode' ? 'bg-primary/10 text-primary' : 'text-muted-foreground dark:text-muted-foreground-d'}`}>
                                    VF-Mode
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                    <div>
                        <Label text="Active Power" />
                        <div className="mt-2 p-1 rounded-lg border border-border dark:border-border-d">
                            <input className="w-full h-[2.2rem] px-3 bg-transparent text-center outline-none" />
                            <div className="flex items-center justify-center mt-2 h-[2.1rem] bg-muted dark:bg-muted-d rounded-md text-center cursor-pointer">Change</div>
                        </div>
                    </div>
                    <div>
                        <Label text="Power Factor" />
                        <div className="mt-2 p-1 rounded-lg border border-border dark:border-border-d">
                            <input className="w-full h-[2.2rem] px-3 bg-transparent text-center outline-none" />
                            <div className="flex items-center justify-center mt-2 h-[2.1rem] bg-muted dark:bg-muted-d rounded-md text-center cursor-pointer">Change</div>
                        </div>
                    </div>
                    <div>
                        <Label text="Reactive Power" />
                        <div className="mt-2 p-1 rounded-lg border border-border dark:border-border-d">
                            <input className="w-full h-[2.2rem] px-3 bg-transparent text-center outline-none" />
                            <div className="flex items-center justify-center mt-2 h-[2.1rem] bg-muted dark:bg-muted-d rounded-md text-center cursor-pointer">Change</div>
                        </div>
                    </div>
                    <div>
                        <Label text="Min. SOC" />
                        <div className="mt-2 p-1 rounded-lg border border-border dark:border-border-d">
                            <input className="w-full h-[2.2rem] px-3 bg-transparent text-center outline-none" />
                            <div className="flex items-center justify-center mt-2 h-[2.1rem] bg-muted dark:bg-muted-d rounded-md text-center cursor-pointer">Change</div>
                        </div>
                    </div>
                    <div>
                        <Label text="Max. SOC" />
                        <div className="mt-2 p-1 rounded-lg border border-border dark:border-border-d">
                            <input className="w-full h-[2.2rem] px-3 bg-transparent text-center outline-none" />
                            <div className="flex items-center justify-center mt-2 h-[2.1rem] bg-muted dark:bg-muted-d rounded-md text-center cursor-pointer">Change</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}