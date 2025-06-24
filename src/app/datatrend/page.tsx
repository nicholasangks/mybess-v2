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

const DATA_OPTIONS = ['C1 SOC', 'C1 Total Power', 'C1 Total Voltage'];

export default function DataTrend() {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedData, setSelectedData] = useState<string[]>(DATA_OPTIONS);

  const fetchTrendingData = async () => {
    const payload = {
      start_date: '2024-02-09',
      end_date: '2024-02-09',
      data: selectedData,
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
        grid: {
          color: '#333',
        },
      },
      y: {
        ticks: { color: '#ccc' },
        grid: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className="p-10">
      <H1 text="Trending Data Chart" />

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block mb-1 text-sm font-medium">Start Date:</label>
          <input
            type="date"
            className="w-full p-2 rounded bg-muted text-white"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">End Date:</label>
          <input
            type="date"
            className="w-full p-2 rounded bg-muted text-white"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {DATA_OPTIONS.map((option, index) => (
          <div key={option}>
            <label className="block mb-1 text-sm font-medium">Data{index + 1}:</label>
            <select
              value={selectedData[index]}
              onChange={(e) => {
                const updated = [...selectedData];
                updated[index] = e.target.value;
                setSelectedData(updated);
              }}
              className="w-full p-2 rounded bg-muted text-white"
            >
              {DATA_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="col-span-2">
          <button
            onClick={() => fetchTrendingData()}
            className="w-full py-2 mt-2 text-center rounded bg-primary text-white"
          >
            Apply
          </button>
        </div>
      </div>

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
