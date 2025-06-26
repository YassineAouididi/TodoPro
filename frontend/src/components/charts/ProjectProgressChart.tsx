import React, { useEffect, useState } from 'react';
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
import { getAllProjects } from '../../Services/projectService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        callback: function(value: any) {
          return value + '%';
        }
      }
    }
  }
};

const COLORS = [
  'rgba(59, 130, 246, 0.7)',
  'rgba(20, 184, 166, 0.7)',
  'rgba(139, 92, 246, 0.7)',
  'rgba(249, 115, 22, 0.7)',
  'rgba(16, 185, 129, 0.7)'
];
const BORDER_COLORS = [
  'rgb(59, 130, 246)',
  'rgb(20, 184, 166)',
  'rgb(139, 92, 246)',
  'rgb(249, 115, 22)',
  'rgb(16, 185, 129)'
];

const ProjectProgressChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [progressData, setProgressData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await getAllProjects();
        if (error || !data) {
          setLabels([]);
          setProgressData([]);
        } else {
          setLabels(data.map((p: any) => p.name));
          setProgressData(data.map((p: any) => typeof p.progress === 'number' ? p.progress : 0));
        }
      } catch (err) {
        setLabels([]);
        setProgressData([]);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Progress',
        data: progressData,
        backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
        borderColor: labels.map((_, i) => BORDER_COLORS[i % BORDER_COLORS.length]),
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return <Bar options={options} data={chartData} />;
};

export default ProjectProgressChart;