import React from 'react';
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

const Chart = () => {
  const data = {
    labels: [
      'Januari 2025', 'Februari 2025', 'Maret 2025', 'April 2025',
      'Mei 2025', 'Juni 2025', 'Juli 2025', 'Agustus 2025',
      'September 2025', 'Oktober 2025', 'November 2025', 'Desember 2025'
    ],
    datasets: [
      {
        label: 'Total Transaksi Per-bulan',
        data: [0, 0, 0, 460000, 410000, 260000, 0, 0, 0, 0, 0, 0],
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

  return <Line data={data} className='mt-16' options={options} />;
};

export default Chart;
