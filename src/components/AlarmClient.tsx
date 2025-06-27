'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ContentWrapper from '@/components/ContentWrapper';
import { api } from "@/helpers/apiHelper";

async function getActiveAlarms() {
    return await api('/allalarm/', 'GET');
}

async function getHistoryAlarms() {
    return await api('/historyalarm/', 'GET');
}

async function getBmsAlarms() {
    return await api('/bmsalarm/', 'GET');
}

async function getPcsAlarms() {
    return await api('/pcsalarm/', 'GET');
}

async function getHvacAlarms() {
    return await api('/hvacalarm/', 'GET');
}

async function getLcsAlarms() {
    return await api('/lcsalarm/', 'GET');
}

export default function AlarmClient() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
    const [type, setType] = useState('All');
    const types = ['BMS', 'PCS', 'LCS', 'HVAC'];
    const [alarms, setAlarms] = useState<any>([]);

    const init = async () => {
        const _alarms = await getActiveAlarms();
        setAlarms(_alarms);
    };

    const handleTabChange = async (tab: 'active' | 'history') => {
        setActiveTab(tab);
        const _alarms = tab === 'active' ? await getActiveAlarms() : await getHistoryAlarms();
        setAlarms(_alarms);
    };

    const handleTypeChange = async (newType: string) => {
        setActiveTab('active');
        setType(newType);

        let _alarms;
        switch (newType) {
            case 'BMS':
                _alarms = await getBmsAlarms();
                break;
            case 'PCS':
                _alarms = await getPcsAlarms();
                break;
            case 'LCS':
                _alarms = await getLcsAlarms();
                break;
            case 'HVAC':
                _alarms = await getHvacAlarms();
                break;
            default:
                _alarms = await getActiveAlarms();
        }

        setAlarms(_alarms);
    };

    useEffect(() => {
        const initialType = searchParams.get('type');
        if (initialType && types.includes(initialType)) {
            handleTypeChange(initialType);
        } else {
            init();
        }
    }, []);

    return (
        <ContentWrapper title="Alarms">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                    <div>
                        <div className="inline-flex h-[2.3rem] rounded-full bg-secondary p-[2px]">
                            <div
                                onClick={() => handleTabChange('active')}
                                className={`px-4 flex items-center justify-center rounded-full cursor-pointer transition
                                    ${activeTab === 'active' ? 'bg-background text-primary font-medium' : 'text-muted-foreground'}`}
                            >
                                Active
                            </div>
                            <div
                                onClick={() => handleTabChange('history')}
                                className={`px-4 flex items-center justify-center rounded-full cursor-pointer transition
                                    ${activeTab === 'history' ? 'bg-background text-primary font-medium' : 'text-muted-foreground'}`}
                            >
                                History
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 ml-7 text-sm cursor-pointer">
                        {types.map((tab) => (
                            <div
                                key={tab}
                                onClick={() => handleTypeChange(tab)}
                                className={`transition-colors ${type === tab ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <div className="min-w-[1240px] md:min-w-0 rounded-tl-lg rounded-tr-lg border border-muted">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-muted text-muted-foreground">
                                <th className="w-[4%] px-3 py-3 font-normal">ID</th>
                                <th className="w-[17%] px-3 py-3 font-normal">Occurance Time</th>
                                {activeTab === 'history' && <th className="w-[17%] px-3 py-3 font-normal">Clearance Time</th>}
                                <th className="w-[12%] px-3 py-3 font-normal">Alarm Code</th>
                                <th className="w-auto px-3 py-3 font-normal">Description</th>
                                <th className="w-[8%] px-3 py-3 font-normal">Source</th>
                                <th className="w-[15%] px-3 py-3 font-normal">Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alarms && alarms.length > 0 ? (
                                alarms.map((alarm: any, index: number) => {
                                    let colorClass = '';
                                    let barColor = '';
                                    let filledBars = 0;

                                    switch (alarm.level) {
                                        case 'Critical':
                                            colorClass = 'bg-[#FF4714]/20 text-critical';
                                            barColor = 'bg-critical';
                                            filledBars = 10;
                                            break;
                                        case 'Major':
                                            colorClass = 'bg-[#FFA500]/20 text-major';
                                            barColor = 'bg-major';
                                            filledBars = 6;
                                            break;
                                        case 'Warning':
                                            colorClass = 'bg-[#C5A0FB]/20 text-warning';
                                            barColor = 'bg-warning';
                                            filledBars = 3;
                                            break;
                                        default:
                                            colorClass = 'bg-gray-200 text-gray-600';
                                            barColor = 'bg-gray-300';
                                            filledBars = 1;
                                    }

                                    return (
                                        <tr key={alarm.id} className="align-top border-b border-muted">
                                            <td className="px-3 py-3">{index + 1}</td>
                                            <td className="px-3 py-3">{alarm.date}</td>
                                            {activeTab === 'history' && <td className="px-3 py-3">{alarm.clearDate}</td>}
                                            <td className="px-3 py-3">{alarm.code}</td>
                                            <td className="px-3 py-3">{alarm.description}</td>
                                            <td className="px-3 py-3">{alarm.type}</td>
                                            <td className="flex justify-between px-3 py-3">
                                                <div className="flex items-center gap-[3px]">
                                                    {Array.from({ length: 10 }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-[3px] h-[15px] transition-all duration-300 ${i < filledBars ? barColor : 'bg-muted'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <div className={`text-${colorClass}`}>{alarm.level}</div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={activeTab === 'history' ? 7 : 6}
                                        className="px-3 py-6 text-center text-gray-400"
                                    >
                                        No alarms found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </ContentWrapper>
    );
}
