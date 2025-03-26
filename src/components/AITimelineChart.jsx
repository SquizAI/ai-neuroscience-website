import { useState } from 'react';
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
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AITimelineChart() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  const milestones = [
    { year: '1956', event: 'Dartmouth Workshop - "Artificial Intelligence" term coined', scaling: 10, neuro: 40 },
    { year: '1969', event: 'Perceptron Limitations described by Minsky & Papert', scaling: 15, neuro: 45 },
    { year: '1986', event: 'Backpropagation algorithm popularized', scaling: 25, neuro: 50 },
    { year: '1997', event: 'IBM Deep Blue defeats Kasparov', scaling: 40, neuro: 45 },
    { year: '2006', event: 'Deep Learning renaissance begins', scaling: 50, neuro: 40 },
    { year: '2012', event: 'AlexNet breakthrough in image recognition', scaling: 65, neuro: 35 },
    { year: '2017', event: 'Transformer architecture introduced', scaling: 80, neuro: 30 },
    { year: '2020', event: 'GPT-3 demonstrates scaling laws', scaling: 90, neuro: 25 },
    { year: '2023', event: 'Large-scale generative models (GPT-4, DALL-E 3)', scaling: 95, neuro: 20 },
    { year: '2025', event: 'Growing recognition of scaling limitations', scaling: 85, neuro: 55 },
    { year: '2027', event: 'Projected: Hybrid neuroscience-informed architectures', scaling: 70, neuro: 80 },
  ];
  
  const data = {
    labels: milestones.map(item => item.year),
    datasets: [
      {
        label: 'Scaling Paradigm Dominance',
        data: milestones.map(item => item.scaling),
        borderColor: 'rgba(249, 213, 229, 1)',
        backgroundColor: 'rgba(249, 213, 229, 0.5)',
        pointBackgroundColor: 'rgba(249, 213, 229, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(249, 213, 229, 1)',
        fill: true,
      },
      {
        label: 'Neuroscience Influence',
        data: milestones.map(item => item.neuro),
        borderColor: 'rgba(211, 246, 243, 1)',
        backgroundColor: 'rgba(211, 246, 243, 0.5)',
        pointBackgroundColor: 'rgba(211, 246, 243, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(211, 246, 243, 1)',
        fill: true,
      }
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const index = context.dataIndex;
            return milestones[index].event;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Relative Influence (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Timeline (Years)'
        }
      }
    },
    onHover: (event, elements) => {
      if (elements && elements.length) {
        setHoveredPoint(elements[0].index);
      } else {
        setHoveredPoint(null);
      }
    }
  };

  return (
    <div className="relative">
      <Line data={data} options={options} />
      {hoveredPoint !== null && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-md shadow-md border border-gray-200 text-center">
          <h3 className="text-lg font-semibold">{milestones[hoveredPoint].year}: {milestones[hoveredPoint].event}</h3>
        </div>
      )}
      <div className="mt-6 text-gray-600 text-sm italic">
        Note: The chart shows the relative influence of scaling versus neuroscience approaches in AI research.
        The projections after 2025 are speculative and based on current research trends.
      </div>
    </div>
  );
}
