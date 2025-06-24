'use client';

import GenericLineChart from './GenericLineChart';

export interface PowerData {
  timestamp: string;
  power: number;
}

export default function PowerChart({ data }: { data: PowerData[] }) {
  return (
    <GenericLineChart
      data={data}
      dataKey="power"
      strokeColor="#f59e0b"
      title="Active Power"
    />
  );
}
