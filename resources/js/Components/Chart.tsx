import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Chart = () => {
  const { transaction_yearly } = usePage().props as {
    transaction_yearly?: Record<string, Record<string, number>>;
  };

  if (!transaction_yearly || Object.keys(transaction_yearly).length === 0) {
    return;
  }

  const yearList = Object.keys(transaction_yearly);
  const [selectedYear, setSelectedYear] = useState<string>(yearList[0]);

  const monthlyData = transaction_yearly[selectedYear] || {};

  const chartData = {
    labels: monthNames.map(month => `${month} ${selectedYear}`),
    datasets: [
      {
        label: 'Total Transaksi Per-bulan',
        data: monthNames.map(month => monthlyData[month.toLowerCase()] || 0),
        borderColor: '#277BF8',
        backgroundColor: 'rgba(0, 188, 212, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return `Rp${value.toLocaleString('id-ID')}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `Rp${Number(value).toLocaleString('id-ID')}`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-16">
      <div className="mb-4">
        <label className="mr-2">Pilih Tahun:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border rounded p-2"
        >
          {yearList.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
