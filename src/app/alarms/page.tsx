'use client';

import { useEffect, useState } from 'react';
import H1 from "@/components/Heading/H1";
import { api } from "@/helpers/apiHelper"
import { LuCalendar, LuArrowRight } from "react-icons/lu";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

async function getActiveAlarms() {
    const res = await api('/allalarm/', 'GET');
    return res
}

async function getHistoryAlarms() {
    const res = await api('/historyalarm/', 'GET');
    return res
}

async function getBmsAlarms() {
    const res = await api('/bmsalarm/', 'GET');
    return res
}

async function getPcsAlarms() {
    const res = await api('/pcsalarm/', 'GET');
    return res
}

async function getHvacAlarms() {
    const res = await api('/hvacalarm/', 'GET');
    return res
}

async function getLcsAlarms() {
    const res = await api('/lcsalarm/', 'GET');
    return res
}

export default function Alarms() {
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [type, setType] = useState('All');
    const types = ['BMS', 'PCS', 'LCS', 'HVAC'];
    const [alarms, setAlarms] = useState<any>([]);

    const init = async () => {
        let _alarms = await getActiveAlarms()

        setAlarms(_alarms)
    }

    const handleTabChange = async (tab: 'active' | 'history') => {
        setActiveTab(tab);

        const _alarms = tab === 'active'
            ? await getActiveAlarms()
            : await getHistoryAlarms();

        setAlarms(_alarms);
    };

    const handleTypeChange = async (newType: string) => {
        setActiveTab('active')
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
            case 'HVA':
                _alarms = await getHvacAlarms();
                break;
            default:
                _alarms = await getActiveAlarms();
        }

        setAlarms(_alarms);
    };

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <H1 text="Alarms" />

            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                    <div>
                        <div className="inline-flex h-[2.3rem] rounded-full bg-muted dark:bg-muted-d p-[2px]">
                            <div
                                onClick={() => handleTabChange('active')}
                                className={`px-4 flex items-center justify-center rounded-full cursor-pointer transition
          ${activeTab === 'active' ? 'bg-background dark:bg-background-d text-primary font-medium' : 'text-muted-foreground dark:text-muted-foreground-d'}`}
                            >
                                Active
                            </div>
                            <div
                                onClick={() => handleTabChange('history')}
                                className={`px-4 flex items-center justify-center rounded-full cursor-pointer transition
          ${activeTab === 'history' ? 'bg-background dark:bg-background-d text-primary font-medium' : 'text-muted-foreground dark:text-muted-foreground-d'}`}
                            >
                                History
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex items-center ml-3 rounded-full bg-muted dark:bg-muted-d px-3">
                        <div className="flex items-center justify-center h-[2.3rem] mr-1">
                            <LuCalendar className="text-[1rem] text-muted-foreground dark:text-muted-foreground-d" />
                        </div>
                        <div className="flex gap-0 items-center w-full">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Start Date"
                                className="w-[6rem] h-full bg-transparent text-center outline-none text-foreground placeholder-muted-foreground dark:placeholder-muted-foreground-d"
                                dateFormat="yyyy-MM-dd"
                            />

                            <span className="text-muted-foreground">
                                <LuArrowRight />
                            </span>

                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="End Date"
                                className="max-w-[6rem] h-full bg-transparent text-center outline-none text-foreground placeholder-muted-foreground dark:placeholder-muted-foreground-d"
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                    </div> */}
                    {/* Type */}
                    <div className="flex gap-5 ml-7 text-sm cursor-pointer">
                        {types.map((tab) => (
                            <div
                                key={tab}
                                onClick={() => handleTypeChange(tab)}
                                className={`transition-colors ${type === tab
                                    ? 'text-primary'
                                    : 'text-muted-foreground dark:text-muted-foreground-d'
                                    }`}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-tl-lg rounded-tr-lg border border-color-border dark:border-color-border-dark">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-color-border dark:border-color-border-dark text-muted-foreground dark:text-muted-foreground-d">
                            <th className="w-[4%] px-3 py-3 font-normal">ID</th>
                            <th className="w-[17%] px-3 py-3 font-normal">Occurance Time</th>
                            {activeTab === 'history' &&
                                <th className="w-[17%] px-3 py-3 font-normal">Clearance Time</th>
                            }
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
                                        colorClass = 'bg-[#FF4714]/20 text-[#FF4714]';
                                        barColor = 'bg-[#FF4714] shadow-[0_0_3px_rgba(255,71,20,0.6)]';
                                        filledBars = 10;
                                        break;
                                    case 'Major':
                                        colorClass = 'bg-[#FFA500]/20 text-[#FFA500]';
                                        barColor = 'bg-[#FFA500] shadow-[0_0_3px_rgba(255,165,0,0.6)]';
                                        filledBars = 6;
                                        break;
                                    case 'Warning':
                                        colorClass = 'bg-[#C5A0FB]/20 text-[#C5A0FB]';
                                        barColor = 'bg-[#C5A0FB] shadow-[0_0_3px_rgba(197,160,251,0.6)]';
                                        filledBars = 3;
                                        break;
                                    default:
                                        colorClass = 'bg-gray-200 text-gray-600';
                                        barColor = 'bg-gray-300';
                                        filledBars = 1;
                                }

                                return (
                                    <tr
                                        key={alarm.id}
                                        className="align-top border-b border-color-border dark:border-color-border-dark"
                                    >
                                        <td className="px-3 py-3">{index + 1}</td>
                                        <td className="px-3 py-3">{alarm.date}</td>
                                        {activeTab === 'history' &&
                                            <td className="px-3 py-3">{alarm.clearDate}</td>
                                        }
                                        <td className="px-3 py-3">{alarm.code}</td>
                                        <td className="px-3 py-3">{alarm.description}</td>
                                        <td className="px-3 py-3">{alarm.type}</td>
                                        <td className="flex justify-between  px-3 py-3">
                                            <div className="flex items-center gap-[3px]">
                                                {Array.from({ length: 10 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-[3px] h-[15px] transition-all duration-300 ${i < filledBars ? barColor : 'bg-white/10'}`}
                                                    />
                                                ))}
                                            </div>
                                            <div className={`text-${colorClass}`}>
                                                {alarm.level}
                                            </div>
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
    )
}