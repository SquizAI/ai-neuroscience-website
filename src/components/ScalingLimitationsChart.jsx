import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
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
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const formatNumber = (num) => {
  if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
};

export default function ScalingLimitationsChart({ isFullscreen = false }) {
  const [activeTab, setActiveTab] = useState('parameters');
  const [focusArea, setFocusArea] = useState('all');

  // AI model parameters data
  const modelData = [
    { model: 'GPT-1', year: 2018, parameters: 1.17e8, emergentAbilities: 0 },
    { model: 'GPT-2', year: 2019, parameters: 1.5e9, emergentAbilities: 1 },
    { model: 'GPT-3', year: 2020, parameters: 1.75e11, emergentAbilities: 3 },
    { model: 'PaLM', year: 2022, parameters: 5.4e11, emergentAbilities: 4 },
    { model: 'GPT-4', year: 2023, parameters: 1.76e12, emergentAbilities: 6 },
    { model: 'Theoretical Limit', year: 2027, parameters: 1e13, emergentAbilities: 7 },
  ];

  // Emergent abilities data
  const emergentAbilities = [
    { 
      ability: 'In-context Learning', 
      emergencePoint: 1e10, 
      description: 'The ability to learn from examples provided in the prompt without parameter updates.'
    },
    { 
      ability: 'Instruction Following', 
      emergencePoint: 5e10, 
      description: 'The ability to follow natural language instructions for complex tasks.'
    },
    { 
      ability: 'Few-shot Chain-of-Thought', 
      emergencePoint: 1e11, 
      description: 'The ability to follow and generate step-by-step reasoning with minimal examples.'
    },
    { 
      ability: 'Code Generation', 
      emergencePoint: 5e11, 
      description: 'The ability to write complex code in various programming languages.'
    },
    { 
      ability: 'Multi-modal Reasoning', 
      emergencePoint: 1e12, 
      description: 'The ability to reason across different modalities (text, images, etc.).'
    },
    { 
      ability: 'Theory of Mind', 
      emergencePoint: 5e12, 
      description: 'Limited ability to model others\' mental states.'
    },
    { 
      ability: 'Theoretical Limit', 
      emergencePoint: 1e13, 
      description: 'Physical and computational limits constrain further scaling.'
    },
  ];

  // Limitations data
  const limitations = [
    { 
      limitation: 'Computational Cost', 
      threshold: 1e11, 
      description: 'Training costs exceed tens of millions of dollars.',
      impact: 'Limits accessibility and research diversity.' 
    },
    { 
      limitation: 'Energy Consumption', 
      threshold: 5e11, 
      description: 'Energy requirements become environmentally significant.',
      impact: 'Raises sustainability concerns.' 
    },
    { 
      limitation: 'Data Exhaustion', 
      threshold: 1e12, 
      description: 'Quality training data becomes scarce.',
      impact: 'Diminishing returns on additional parameters.' 
    },
    { 
      limitation: 'Memorization vs. Understanding', 
      threshold: 5e12, 
      description: 'Models predominantly memorize rather than understand.',
      impact: 'Plateau in reasoning capabilities despite increased scale.' 
    },
    { 
      limitation: 'Physical Hardware Limits', 
      threshold: 1e13, 
      description: 'Atomic-scale physical limits constrain further scaling.',
      impact: 'Fundamental barrier to continued scaling.' 
    },
  ];

  // Parameters chart data
  const parametersData = {
    labels: modelData.map(item => item.model),
    datasets: [
      {
        label: 'Parameters (log scale)',
        data: modelData.map(item => item.parameters),
        borderColor: 'rgba(249, 213, 229, 1)',
        backgroundColor: 'rgba(249, 213, 229, 0.5)',
        pointBackgroundColor: 'rgba(249, 213, 229, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(249, 213, 229, 1)',
        fill: true,
      }
    ],
  };

  // Emergent abilities chart data
  const emergentData = {
    labels: emergentAbilities.map(item => item.ability),
    datasets: [
      {
        label: 'Parameters Required for Emergence (log scale)',
        data: emergentAbilities.map(item => item.emergencePoint),
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

  // Limitations chart data
  const limitationsData = {
    labels: limitations.map(item => item.limitation),
    datasets: [
      {
        label: 'Parameter Threshold Where Limitation Becomes Significant (log scale)',
        data: limitations.map(item => item.threshold),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
      }
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatNumber(context.parsed.y);
            }
            return label;
          },
          afterLabel: function(context) {
            if (activeTab === 'parameters') {
              return `Year: ${modelData[context.dataIndex].year}`;
            } else if (activeTab === 'emergent') {
              return emergentAbilities[context.dataIndex].description;
            } else if (activeTab === 'limitations') {
              return limitations[context.dataIndex].description;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Parameters (log scale)'
        }
      }
    }
  };

  return (
    <div className={`${isFullscreen ? 'w-full h-full' : 'card p-6 bg-white'}`}>
      {!isFullscreen && (
        <>
          <h3 className="text-xl font-semibold mb-4">Scaling Paradigm: Progression and Limitations</h3>
          <p className="text-gray-600 mb-6">
            This visualization explores the scaling paradigm in AI, showing model size growth,
            emergent abilities, and fundamental limitations.
          </p>
        </>
      )}
      
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'parameters' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('parameters')}
        >
          Model Parameters Growth
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'emergent' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('emergent')}
        >
          Emergent Abilities
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'limitations' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('limitations')}
        >
          Scaling Limitations
        </button>
      </div>
      
      <div className={`${isFullscreen ? 'h-[600px]' : 'h-80'}`}>
        {activeTab === 'parameters' && <Line key="parameters-chart" data={parametersData} options={options} />}
        {activeTab === 'emergent' && <Line key="emergent-chart" data={emergentData} options={options} />}
        {activeTab === 'limitations' && <Line key="limitations-chart" data={limitationsData} options={options} />}
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg font-medium mb-4">Key Insights</h4>
        
        {activeTab === 'parameters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-md mb-2">Exponential Growth</h5>
              <p className="text-sm text-gray-600">
                AI model sizes have increased by approximately 10x every 2 years since 2018.
                This exponential scaling has been a primary driver of capability improvements.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-md mb-2">Practical Barriers</h5>
              <p className="text-sm text-gray-600">
                The trend faces practical limitations: computational resources, energy requirements,
                data availability, and diminishing returns on performance improvements.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'emergent' && (
          <div>
            <div className="flex space-x-2 mb-4">
              <button
                className={`px-3 py-1 text-sm rounded ${focusArea === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setFocusArea('all')}
              >
                All Abilities
              </button>
              <button
                className={`px-3 py-1 text-sm rounded ${focusArea === 'early' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setFocusArea('early')}
              >
                Early Emergence
              </button>
              <button
                className={`px-3 py-1 text-sm rounded ${focusArea === 'late' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                onClick={() => setFocusArea('late')}
              >
                Late Emergence
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {emergentAbilities
                .filter(ability => {
                  if (focusArea === 'all') return true;
                  if (focusArea === 'early') return ability.emergencePoint <= 1e11;
                  if (focusArea === 'late') return ability.emergencePoint > 1e11;
                  return true;
                })
                .map((ability, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-md">{ability.ability}</h5>
                      <span className="text-xs px-2 py-1 bg-primary-100 rounded-full">
                        ~{formatNumber(ability.emergencePoint)} parameters
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{ability.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {activeTab === 'limitations' && (
          <div className="space-y-4">
            {limitations.map((limitation, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h5 className="font-medium text-md">{limitation.limitation}</h5>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                    Becomes significant at ~{formatNumber(limitation.threshold)} parameters
                  </span>
                </div>
                <p className="text-sm text-gray-600">{limitation.description}</p>
                <p className="text-sm font-medium mt-1">Impact: {limitation.impact}</p>
              </div>
            ))}
            
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h5 className="font-medium text-md mb-2">Beyond Scaling: The Need for New Approaches</h5>
              <p className="text-sm text-gray-700">
                As we approach the theoretical limits of the scaling paradigm, alternative approaches
                informed by neuroscience principles may become increasingly important. These might include:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                <li>Active inference architectures that test predictions through actions</li>
                <li>Embodied systems that ground understanding in sensorimotor experience</li>
                <li>Metastable systems that balance exploration and exploitation</li>
                <li>Models that incorporate physical constraints and energy minimization principles</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
