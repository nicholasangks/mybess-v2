'use client';

import { useEffect, useState } from 'react';
import H1 from '@/components/Heading/H1';
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function DataTrend() {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTrendingData = async () => {
    const payload = {
        start_date: '2024-02-09',
        end_date: '2024-02-09',
        data: ['C1 SOC', 'C1 Total Power', 'C1 Total Voltage'],
    };

    try {
      const result = await api('/trending/', 'POST', payload);

      setLabels(result.labels);
      const formattedDatasets = Object.entries(result.datasets).map(([label, data]) => ({
        label,
        data,
        fill: false,
        borderColor: getColor(label),
        borderWidth: 1.5,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 0,
      }));
      setDatasets(formattedDatasets);
    } catch (error) {
      console.error('Failed to fetch trending data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (label: string) => {
    switch (label) {
      case 'C1 SOC':
        return 'rgba(75, 192, 192, 1)';
      case 'C1 Total Power':
        return 'rgba(255, 99, 132, 1)';
      case 'C1 Total Voltage':
        return 'rgba(54, 162, 235, 1)';
      default:
        return 'rgba(153, 102, 255, 1)';
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      tooltip: {
        mode: 'index' as const,
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
        position: 'top' as const,
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
      },
      y: {
        ticks: { color: '#ccc' },
      },
    },
  };

  return (
    <div className="p-10">
      <H1 text="Trending Data Chart" />
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <div className="mt-10">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
