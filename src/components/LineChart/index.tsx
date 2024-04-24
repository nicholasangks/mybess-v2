"use client";
import { useTheme } from "next-themes";

// import {
//     Chart as ChartJS,
//     defaults
//   } from 'chart.js';
//   import {
//     Chart
//   } from 'react-chartjs-2';

interface LineChartProps {
}

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Title);


export default function LineChart({ }: LineChartProps) {
    const { theme } = useTheme();
    const borderColor = theme === 'dark' ? '#b7b7b7' : '#00943A';
    const gridColor = theme === 'dark' ? '#676767' : '#E4E4E4';
    const ticksColor = theme === 'dark' ? '#b7b7b7' : '#7f7f7f';

    return (
        <div>
            <Line
                className="w-full"
                data={{
                    labels: [
                        "2023-01",
                        "2023-02",
                        "2023-03",
                        "2023-04",
                        "2023-05",
                        "2023-06",
                        "2023-07",
                    ],
                    datasets: [
                        {
                            data: [100, 120, 115, 134, 168, 132, 160],
                            // backgroundColor: "purple",
                            borderColor: borderColor,
                            borderWidth: 1.5
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            grid: {
                                color: gridColor, // Set x-axis grid color
                            },
                            ticks: {
                                color: ticksColor, // Set x-axis tick color
                            },
                        },
                        y: {
                            grid: {
                                color: gridColor, // Set y-axis grid color
                            },
                            ticks: {
                                color: ticksColor, // Set y-axis tick color
                            },
                        },
                    },
                }}
            />
        </div>
    )
}