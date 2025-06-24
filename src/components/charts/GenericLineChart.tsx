'use client';

import { useTheme } from "next-themes";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import H2 from "../Heading/H2";

interface ChartDataPoint {
    timestamp: string;
    [key: string]: any; // allows dynamic data key (e.g. "soc" or "power")
}

interface GenericLineChartProps {
    data: ChartDataPoint[];
    dataKey: string;
    strokeColor?: string;
    title?: string;
}

export default function GenericLineChart({
    data,
    dataKey,
    // strokeColor = '#3b82f6',
    title,
}: GenericLineChartProps) {

    const { theme } = useTheme();
    const borderColor = theme === 'dark' ? '#b7b7b7' : '#00943A';
    const gridColor = theme === 'dark' ? '#676767' : '#E4E4E4';
    const ticksColor = theme === 'dark' ? '#b7b7b7' : '#7f7f7f';
    const strokeColor = '#009439';

    return (
        <div className="bg-muted dark:bg-muted-d rounded-md">
            {title && <H2 text={title} />}
            <div className="w-full h-[210px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="4 4" stroke={gridColor} />
                        <XAxis
                            dataKey="timestamp"
                            tick={{ fill: ticksColor, fontSize: 13 }}
                            padding={{ left: 0, right: 0 }}
                        />
                        <YAxis width={30} tick={{ fill: ticksColor, fontSize: 13 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                            labelStyle={{ color: '#9ca3af' }}
                            itemStyle={{ color: strokeColor }}
                        />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={strokeColor}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}