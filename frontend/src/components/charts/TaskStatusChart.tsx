import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const TaskStatusChart: React.FC = () => {
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const data = {
    labels: ['Completed', 'In Progress', 'Not Started', 'Overdue'],
    datasets: [
      {
        data: [12, 8, 5, 3],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // green
          'rgba(59, 130, 246, 0.7)', // blue
          'rgba(107, 114, 128, 0.7)', // gray
          'rgba(239, 68, 68, 0.7)'   // red
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(107, 114, 128)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};

export default TaskStatusChart;