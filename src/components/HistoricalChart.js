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

const HistoricalChart = ({ historicalData, fromCurrency, toCurrency }) => {
  if (!historicalData) {
    return <div className="chart-loading">Pilih mata uang yang berbeda untuk melihat grafik.</div>;
  }

  const chartData = {
    labels: Object.keys(historicalData).sort(), // Urutkan tanggal
    datasets: [
      {
        label: `Kurs ${fromCurrency} ke ${toCurrency}`,
        data: Object.keys(historicalData).sort().map(date => historicalData[date][toCurrency]),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Histori Kurs 30 Hari Terakhir`,
      },
    },
     scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return <div className="chart-container"><Line options={options} data={chartData} /></div>;
};

export default HistoricalChart;
