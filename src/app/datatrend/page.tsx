'use client';

import { useEffect, useState } from 'react';
import ContentWrapper from '@/components/ContentWrapper';
import Label from '@/components/Label';
import { api } from '@/helpers/apiHelper';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import { LuCalendar, LuArrowRight, LuChevronDown } from "react-icons/lu";
import type { ChartOptions } from 'chart.js';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { saveAs } from 'file-saver';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DATA_OPTIONS = ['None', 'C1 SOC', 'C1 Total Power', 'C1 Total Voltage'];

const getYAxisID = (label: string) => {
    if (label.includes('SOC')) return 'y_soc';
    if (label.includes('Power')) return 'y_power';
    if (label.includes('Voltage')) return 'y_voltage';
    return 'y';
};

const getCssVar = (name: string): string => {
    if (typeof window === 'undefined') return ''; // SSR guard
    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
};

export default function DataTrend() {
    const [labels, setLabels] = useState<string[]>([]);
    const [datasets, setDatasets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(new Date('2024-02-09'));
    const [endDate, setEndDate] = useState<Date | null>(new Date('2024-02-09'));
    const [selectedData, setSelectedData] = useState<string[]>(['C1 SOC', 'C1 Total Power', 'C1 Total Voltage']);

    const fetchTrendingData = async () => {
        const filteredData = selectedData.filter((d) => d !== 'None');

        const payload = {
            start_date: dayjs(startDate).format('YYYY-MM-DD'),
            end_date: dayjs(endDate).format('YYYY-MM-DD'),
            data: filteredData,
        };

        setLoading(true);
        setErrorMessage('');

        try {
            const result = await api('/trending/', 'POST', payload);

            if (result.error) {
                setLabels([]);
                setDatasets([]);
                setErrorMessage(result.error);
                return;
            }

            setLabels(result.labels);
            const formattedDatasets = Object.entries(result.datasets).map(([label, data]) => ({
                label,
                data,
                fill: false,
                borderColor: getColor(label),
                borderWidth: 1.7,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 0,
                yAxisID: getYAxisID(label),
            }));
            setDatasets(formattedDatasets);
        } catch (error) {
            console.error('Failed to fetch trending data:', error);
            setErrorMessage('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (!labels.length || !datasets.length) return;

        let csv = 'Time,' + datasets.map(ds => ds.label).join(',') + '\n';

        labels.forEach((label, i) => {
            const row = [label];
            datasets.forEach(ds => {
                row.push(ds.data[i] !== undefined ? ds.data[i] : '');
            });
            csv += row.join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `data_trend_${dayjs().format('YYYYMMDD_HHmmss')}.csv`);
        // saveAs(blob, `data_trend_${dayjs(startDate).format('YYYYMMDD')}_${dayjs(endDate).format('YYYYMMDD')}.csv`);
    };

    const getColor = (label: string) => {
        switch (label) {
            case 'C1 SOC':
                // return 'rgba(75, 192, 192, 1)';
                return getCssVar('--graph-a');
            case 'C1 Total Power':
                // return 'rgba(0, 166, 64, 1)';
                return getCssVar('--graph-b');
            case 'C1 Total Voltage':
                // return 'rgba(54, 162, 235, 1)';
                return getCssVar('--graph-c');
            default:
                return 'rgba(153, 102, 255, 1)';
        }
    };

    useEffect(() => {
        fetchTrendingData();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [startDate, endDate, selectedData]);

    const chartData = {
        labels,
        datasets,
    };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        layout: {
            padding: {
                top: 0,
                bottom: 40,
            },
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: (tooltipItems: any) => {
                        const date = dayjs(tooltipItems[0].label);
                        return date.format('hh:mm A');
                    },
                    label: (tooltipItem: any) => {
                        const label = tooltipItem.dataset.label;
                        const value = tooltipItem.formattedValue;
                        let unit = '';
                        if (label.includes('Power')) unit = 'kW';
                        else if (label.includes('SOC')) unit = '%';
                        else if (label.includes('Voltage')) unit = 'V';
                        return `${label} = ${value} ${unit}`;
                    },
                },
            },
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    color: getCssVar('--foreground'),
                    padding: 20,
                    boxWidth: 12,
                    boxHeight: 12,
                    font: {
                        size: 12,
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: getCssVar('--muted-foreground'),
                },
                grid: {
                    color: getCssVar('--muted'),
                },
            },
            y_soc: {
                type: 'linear',
                position: 'left',
                // ticks: {
                //     color: '#ccc',
                // },
                ticks: {
                    color: getCssVar('--muted-foreground'),
                },
                // grid: { color: '#444' },
                grid: {
                    color: getCssVar('--muted'),
                },
                title: {
                    display: true,
                    text: '%',
                    color: '#ccc',
                },
            },
            y_power: {
                type: 'linear',
                position: 'right',
                min: 0,
                ticks: {
                    color: getCssVar('--muted-foreground'),
                },
                // grid: { drawOnChartArea: false },
                title: {
                    display: true,
                    text: 'kW',
                    color: '#ccc',
                },
            },
            y_voltage: {
                type: 'linear',
                position: 'right',
                offset: true,
                ticks: {
                    color: getCssVar('--muted-foreground'),
                },
                grid: { drawOnChartArea: false },
                title: {
                    display: true,
                    text: 'V',
                    color: '#ccc',
                },
            },
        },
    };

    return (
        <ContentWrapper title="Data Trend">
            <div className="px-0 py-5">
                <div className="md:flex items-end justify-between gap-6 mb-10">
                    <div className="md:flex gap-10">
                        <div>
                            <Label text="Date" className="mb-1" />
                            <div className="flex items-center h-[2.2rem] rounded-md bg-muted px-3">
                                <div className="flex items-center justify-center h-[2.3rem] mr-1">
                                    <LuCalendar className="text-[1rem] text-muted-foreground" />
                                </div>
                                <div className="flex gap-0 items-center w-full">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="Start Date"
                                        className="w-[6rem] h-full bg-transparent text-center outline-none text-foreground placeholder-muted-foreground"
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
                                        minDate={startDate ?? undefined}
                                        placeholderText="End Date"
                                        className="max-w-[6rem] h-full bg-transparent text-center outline-none text-foreground placeholder-muted-foreground"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3 mt-5 md:mt-0">
                            {selectedData.map((_, index) => (
                                <div key={index}>
                                    <Label text={`Data${index + 1}`} className="mb-1" />
                                    <div className="relative">
                                        <select
                                            value={selectedData[index]}
                                            onChange={(e) => {
                                                const updated = [...selectedData];
                                                updated[index] = e.target.value;
                                                setSelectedData(updated);
                                            }}
                                            className="w-full h-[2.2rem] px-3 pr-8 rounded-md bg-muted cursor-pointer outline-none appearance-none"
                                        >
                                            {DATA_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt} className="bg-muted">{opt}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">
                                            <LuChevronDown />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-7 md:mt-0">
                        <button
                            onClick={() => fetchTrendingData()}
                            className="min-w-[6.7rem] h-[2.1rem] px-3 rounded-md bg-primary text-white"
                            disabled={selectedData.every(d => d === 'None')}
                        >
                            Apply
                        </button>
                        <button
                            onClick={exportToCSV}
                            className="min-w-[7rem] h-[2.2rem] px-3 rounded-md border border-border"
                            disabled={!labels.length || !datasets.length}
                        >
                            Export CSV
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p className="mt-4">Loading...</p>
                ) : errorMessage ? (
                    <p className="mt-4 text-red-500">{errorMessage}</p>
                ) : (
                    <div className="mt-10 overflow-x-auto">
                        <div className="min-w-[900px] md:min-w-0">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </ContentWrapper>
    );
}
