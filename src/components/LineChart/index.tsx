"use client";

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
                        },
                    ],
                }} />
        </div>
    )
}