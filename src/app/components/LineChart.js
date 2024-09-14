'use client';
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

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const sortDiagnosisHistory = (diagnosisHistory) => {
  return diagnosisHistory.sort((a, b) => {
    if (a.year === b.year) {
      return monthOrder[a.month] - monthOrder[b.month];
    }
    return a.year - b.year;
  });
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Blood Pressure',
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value',
      },
      suggestedMin: -10,
      suggestedMax: 200,
    },
  },
};

const LineChart = ({ diagnosisHistory }) => {
  const sortedDiagnosisHistory = sortDiagnosisHistory(diagnosisHistory);
  const lastSixMonthsData = sortedDiagnosisHistory.slice(-6);

  const months = lastSixMonthsData.map((item) => `${item.month}, ${item.year}`);

  // const months = sortedDiagnosisHistory.map(
  //   (item) => `${item.month}, ${item.year}`
  // );

  const systolicData = diagnosisHistory.map(
    (item) => item.blood_pressure.systolic.value
  );
  const diastolicData = diagnosisHistory.map(
    (item) => item.blood_pressure.diastolic.value
  );

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Systolic Blood Pressure',
        data: systolicData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Diastolic Blood Pressure',
        data: diastolicData,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
