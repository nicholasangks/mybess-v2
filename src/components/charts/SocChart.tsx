'use client';

import GenericLineChart from './GenericLineChart';

export interface SocData {
  timestamp: string;
  soc: number;
}

export default function SocChart({ data }: { data: SocData[] }) {
  return (
    <GenericLineChart
      data={data}
      dataKey="soc"
      strokeColor="#3b82f6"
      title="State of Charge"
    />
  );
}
