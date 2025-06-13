import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProjectProgressChart: React.FC = () => {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  const data = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
    datasets: [
      {
        label: 'Progress',
        data: [75, 40, 90, 25, 60],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // blue
          'rgba(20, 184, 166, 0.7)', // teal
          'rgba(139, 92, 246, 0.7)', // purple
          'rgba(249, 115, 22, 0.7)', // orange
          'rgba(16, 185, 129, 0.7)'  // green
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(20, 184, 166)',
          'rgb(139, 92, 246)',
          'rgb(249, 115, 22)',
          'rgb(16, 185, 129)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ProjectProgressChart;