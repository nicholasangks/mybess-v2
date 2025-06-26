'use client';

import { useEffect, useState } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import Label from "@/components/Label";
import { api } from "@/helpers/apiHelper";
import { LuPower } from "react-icons/lu";

// Modal
function ConfirmationModal({ message, onConfirmAction, onCloseAction }: { message: string, onConfirmAction: () => void, onCloseAction: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-background p-5 rounded-lg w-[300px] text-center">
                <p className="mb-4 text-base text-muted-foreground">{message}</p>
                <div className="flex justify-between gap-3">
                    <button className="flex items-center justify-center w-full h-[2.2rem] rounded-md bg-muted" onClick={onCloseAction}>Cancel</button>
                    <button className="flex items-center justify-center w-full h-[2.2rem] rounded-md bg-primary text-white" onClick={onConfirmAction}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

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
    return res;
}

async function getSoc() {
    const res = await api('/socmanagement/', 'GET');
    return res;
}

export default function ControlPanel() {
    const [controlData, setControlData] = useState<PcsControlData | null>(null);
    const [socData, setSocData] = useState<SocData>({ minSOC: 0, maxSOC: 0 });

    const [activePower, setActivePower] = useState('');
    const [powerFactor, setPowerFactor] = useState('');
    const [reactivePower, setReactivePower] = useState('');
    const [minSoc, setMinSoc] = useState('');
    const [maxSoc, setMaxSoc] = useState('');

    const [modalData, setModalData] = useState<{ key: string, value: any } | null>(null);

    const init = async () => {
        const _controlData = await getPcsControl();
        const _socData = await getSoc();

        setControlData(_controlData);
        setSocData(_socData);

        setActivePower(String(_controlData.activePowerCtrl));
        setPowerFactor(String(_controlData.powerFactorCtrl));
        setReactivePower(String(_controlData.reactivePowerCtrl));
        setMinSoc(String(_socData.minSOC));
        setMaxSoc(String(_socData.maxSOC));
    };

    const handleSubmit = (key: string, value: any) => {
        setModalData({ key, value });
    };

    const confirmPost = async () => {
        if (modalData) {
            await api('/pcsctrl/', 'POST', { [modalData.key]: modalData.value });
            setModalData(null);
            init();
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <ContentWrapper title="Control Panel">
            <div className="max-w-[750px] mt-[5rem] mx-auto">
                {/* Operation */}
                <div className="flex items-center">
                    <Label text="Operation" className="mr-3" />
                    <div className="flex items-center cursor-pointer" onClick={() => {
                        const newValue = controlData?.onOff.toLowerCase().includes('off') ? 'On' : 'Off';
                        handleSubmit("onOff", newValue);
                    }}>
                        <div className={`flex items-center justify-center w-[4rem] aspect-square mr-2 rounded-full border-[2px] ${controlData?.onOff.toLowerCase() === 'on' ? 'border-primary' : 'border-muted'}`}>
                            <div className={`flex items-center justify-center w-[80%] aspect-square rounded-full ${controlData?.onOff.toLowerCase() === 'on' ? 'bg-primary opacity-30 blur-md' : 'bg-muted'}`}></div>
                            <LuPower className="absolute text-xl" />
                        </div>
                        <div className={`font-medium ${controlData?.onOff.toLowerCase() === 'on' ? 'text-primary' : 'text-muted-foreground'}`}>{controlData?.onOff}</div>
                    </div>
                </div>

                {/* Modes */}
                <div className="grid grid-cols-2 my-10 py-10 border-t border-b border-muted">
                    <div className="border-r border-muted pr-10">
                        <Label text="Control" />
                        <div className="grid grid-cols-2 gap-5 mt-4">
                            {['remote-mode', 'local-mode'].map(mode => (
                                <div key={mode} onClick={() => handleSubmit("remoteCtrl", mode)} className={`relative flex items-center justify-center w-full aspect-square rounded-full border-[2px] cursor-pointer ${controlData?.remoteCtrl.toLowerCase() === mode ? 'border-primary text-primary font-medium' : 'border-muted text-muted-foreground'}`}>
                                    <div className={`absolute flex items-center justify-center w-[90%] aspect-square rounded-full ${controlData?.remoteCtrl.toLowerCase() === mode ? 'bg-primary opacity-10 text-primary font-medium' : 'text-muted-foreground'}`}></div>
                                    {mode === 'remote-mode' ? 'Remote' : 'Local'}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pl-10">
                        <Label text="Grid Mode" />
                        <div className="grid grid-cols-2 gap-5 mt-4">
                            {['pq-mode', 'vf-mode'].map(mode => (
                                <div key={mode} onClick={() => handleSubmit("gridModeCtrl", mode)} className={`relative flex items-center justify-center w-full aspect-square rounded-full border-[2px] cursor-pointer ${controlData?.gridModeCtrl.toLowerCase() === mode ? 'border-primary text-primary font-medium' : 'border-muted text-muted-foreground'}`}>
                                    <div className={`absolute flex items-center justify-center w-[90%] aspect-square rounded-full capitalize ${controlData?.gridModeCtrl.toLowerCase() === mode ? 'bg-primary opacity-10' : 'text-muted-foreground'}`}></div>
                                    {mode}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                    {[
                        { label: 'Active Power', value: activePower, setValue: setActivePower, key: 'activePowerCtrl' },
                        { label: 'Power Factor', value: powerFactor, setValue: setPowerFactor, key: 'powerFactorCtrl' },
                        { label: 'Reactive Power', value: reactivePower, setValue: setReactivePower, key: 'reactivePowerCtrl' },
                        { label: 'Min. SOC', value: minSoc, setValue: setMinSoc, key: 'minSOC' },
                        { label: 'Max. SOC', value: maxSoc, setValue: setMaxSoc, key: 'maxSOC' },
                    ].map(({ label, value, setValue, key }) => (
                        <div key={label}>
                            <Label text={label} />
                            <div className="mt-2 p-1 rounded-lg border border-muted">
                                <input
                                    className="w-full h-[2.2rem] px-3 bg-transparent text-center outline-none"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <div
                                    className="flex items-center justify-center mt-2 h-[2.1rem] bg-muted rounded-md text-center cursor-pointer"
                                    onClick={() => handleSubmit(key, value)}
                                >Submit</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalData && (
                <ConfirmationModal
                    message={`Are you sure you want to change "${modalData.key}" to "${modalData.value}"?`}
                    onConfirmAction={confirmPost}
                    onCloseAction={() => setModalData(null)}
                />
            )}
        </ContentWrapper>
    );
}