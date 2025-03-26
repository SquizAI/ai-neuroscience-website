import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

export default function PredictionMechanismsComparison({ isFullscreen = false }) {
  const [activeTab, setActiveTab] = useState('comparison');
  const [aiActive, setAiActive] = useState(true);
  const [brainActive, setBrainActive] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const comparisonPoints = [
    {
      category: 'Fundamental Nature',
      ai: 'Passive prediction based on statistical patterns in training data',
      brain: 'Active prediction that influences perception and drives action',
      key: 'Current AI systems make passive predictions without acting on the world to test hypotheses'
    },
    {
      category: 'Agency',
      ai: 'Limited agency; cannot autonomously act to verify predictions',
      brain: 'High agency; actively tests predictions through actions',
      key: 'The brain\'s predictions are coupled with actions to verify and update models'
    },
    {
      category: 'Embodiment',
      ai: 'Disembodied; lacks physical integration with environment',
      brain: 'Embodied; predictions influenced by bodily states and needs',
      key: 'Embodiment provides the brain with essential sensorimotor data for predictions'
    },
    {
      category: 'Contextual Understanding',
      ai: 'Context primarily derived from text/data patterns',
      brain: 'Multi-modal context including interoceptive signals',
      key: 'Brains integrate internal body states into their predictive models'
    },
    {
      category: 'Error Correction',
      ai: 'Updates through model training or fine-tuning',
      brain: 'Real-time adaptation through prediction error minimization',
      key: 'Brains continuously update predictions based on new sensory evidence'
    },
    {
      category: 'Temporal Dynamics',
      ai: 'Primarily focused on next-token prediction',
      brain: 'Hierarchical prediction across multiple timescales',
      key: 'The brain makes predictions at different temporal scales simultaneously'
    }
  ];

  const aiPredictionSteps = [
    { 
      title: 'Training on Data', 
      description: 'AI models learn statistical patterns from large datasets',
      detail: 'During training, the model adjusts weights to minimize the difference between its predictions and actual data'
    },
    { 
      title: 'Token Prediction', 
      description: 'When prompted, AI predicts the most likely next token based on patterns',
      detail: 'The model calculates probabilities for each potential next token and selects the most likely one'
    },
    { 
      title: 'Passive Continuation', 
      description: 'AI continues generating tokens based on statistical likelihoods',
      detail: 'Each token prediction is based on the sequence that came before it, without testing hypotheses in the real world'
    },
    { 
      title: 'No Action Loop', 
      description: 'AI cannot act in the world to verify its predictions',
      detail: 'Current AI systems lack the capability to take autonomous actions to test whether their predictions are accurate'
    },
    { 
      title: 'Limited Feedback', 
      description: 'AI only updates based on human feedback or additional training',
      detail: 'The system cannot independently seek information to improve its model of the world'
    }
  ];

  const brainPredictionSteps = [
    { 
      title: 'Top-down Predictions', 
      description: 'The brain generates predictions about sensory inputs',
      detail: 'Higher-level brain regions send prediction signals down to sensory processing areas'
    },
    { 
      title: 'Prediction Error', 
      description: 'Differences between predictions and actual sensory input create prediction errors',
      detail: 'These errors signal that the internal model needs updating'
    },
    { 
      title: 'Perceptual Update', 
      description: 'Perception emerges from the interplay between predictions and sensory data',
      detail: 'What we perceive is a combination of our predictions and actual sensory input'
    },
    { 
      title: 'Action Generation', 
      description: 'The brain can act to test or confirm its predictions',
      detail: 'Through movement and exploration, the brain actively samples the environment to verify its hypotheses'
    },
    { 
      title: 'Continuous Learning', 
      description: 'The model updates based on new data gathered through action',
      detail: 'This creates a closed action-perception loop that allows continual model refinement'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setAnimationStep(prev => {
          const max = activeTab === 'ai' ? aiPredictionSteps.length - 1 : 
                    activeTab === 'brain' ? brainPredictionSteps.length - 1 : 0;
          return prev < max ? prev + 1 : 0;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeTab]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      setAnimationStep(0);
    }
  };

  return (
    <div className={`${isFullscreen ? 'w-full h-full' : 'card p-6 bg-white'}`}>
      {!isFullscreen && (
        <>
          <h3 className="text-xl font-semibold mb-4">Prediction Mechanisms: AI vs. Brain</h3>
          <p className="text-gray-600 mb-6">
            This visualization compares how prediction works in current AI systems versus the human brain,
            highlighting key differences in agency, embodiment, and feedback mechanisms.
          </p>
        </>
      )}
      
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'comparison' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('comparison')}
        >
          Side-by-Side Comparison
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'ai' ? 'bg-scaling text-gray-800' : 'bg-gray-200'}`}
          onClick={() => {
            setActiveTab('ai');
            setAnimationStep(0);
            setIsAutoPlaying(false);
          }}
        >
          AI Prediction Process
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'brain' ? 'bg-neuroscience text-gray-800' : 'bg-gray-200'}`}
          onClick={() => {
            setActiveTab('brain');
            setAnimationStep(0);
            setIsAutoPlaying(false);
          }}
        >
          Brain Prediction Process
        </button>
      </div>
      
      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
          <div className="lg:col-span-5">
            <div className={`p-4 rounded-lg ${aiActive ? 'bg-scaling bg-opacity-20' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">AI Systems</h4>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setAiActive(!aiActive)}
                >
                  {aiActive ? <HiOutlineChevronUp size={20} /> : <HiOutlineChevronDown size={20} />}
                </button>
              </div>
              
              {aiActive && (
                <div className="space-y-4">
                  {comparisonPoints.map((point, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3">
                      <p className="text-xs text-gray-500 uppercase">{point.category}</p>
                      <p className="text-sm">{point.ai}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="h-full w-px bg-gray-300"></div>
          </div>
          
          <div className="lg:col-span-5">
            <div className={`p-4 rounded-lg ${brainActive ? 'bg-neuroscience bg-opacity-20' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Human Brain</h4>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setBrainActive(!brainActive)}
                >
                  {brainActive ? <HiOutlineChevronUp size={20} /> : <HiOutlineChevronDown size={20} />}
                </button>
              </div>
              
              {brainActive && (
                <div className="space-y-4">
                  {comparisonPoints.map((point, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3">
                      <p className="text-xs text-gray-500 uppercase">{point.category}</p>
                      <p className="text-sm">{point.brain}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-11 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium mb-2">Key Differences</h4>
              <ul className="space-y-2">
                {comparisonPoints.map((point, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{point.category}:</span> {point.key}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'ai' && (
        <div className="relative">
          <div className="flex justify-end mb-4">
            <button 
              onClick={toggleAutoPlay}
              className={`text-sm px-3 py-1 rounded-md ${isAutoPlaying ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
            >
              {isAutoPlaying ? 'Stop Animation' : 'Auto-Play Animation'}
            </button>
          </div>
          
          <div className="h-64 relative border border-gray-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
                <h4 className="text-lg font-medium text-gray-800">
                  {aiPredictionSteps[animationStep].title}
                </h4>
                <p className="text-sm text-gray-600">
                  {aiPredictionSteps[animationStep].description}
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <motion.div 
                className="h-full bg-scaling"
                initial={{ width: '0%' }}
                animate={{ width: `${(animationStep + 1) * (100 / aiPredictionSteps.length)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-5">
            {aiPredictionSteps.map((step, index) => (
              <div 
                key={index}
                className={`cursor-pointer ${index === animationStep ? 'font-semibold' : 'text-gray-500'}`}
                onClick={() => {
                  setAnimationStep(index);
                  setIsAutoPlaying(false);
                }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                    index === animationStep ? 'bg-scaling' : 
                    index < animationStep ? 'bg-gray-300' : 'bg-gray-200'
                  }`}>
                    <span className="text-xs">{index + 1}</span>
                  </div>
                  <span className="text-xs text-center">{step.title.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-md font-medium mb-2">Details</h4>
            <p className="text-sm">{aiPredictionSteps[animationStep].detail}</p>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>
              AI prediction mechanisms are primarily passive, operating on statistical patterns learned
              from training data. Unlike brains, they lack the capability to actively test their predictions
              through autonomous interaction with the environment.
            </p>
          </div>
        </div>
      )}
      
      {activeTab === 'brain' && (
        <div className="relative">
          <div className="flex justify-end mb-4">
            <button 
              onClick={toggleAutoPlay}
              className={`text-sm px-3 py-1 rounded-md ${isAutoPlaying ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
            >
              {isAutoPlaying ? 'Stop Animation' : 'Auto-Play Animation'}
            </button>
          </div>
          
          <div className="h-64 relative border border-gray-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
                <h4 className="text-lg font-medium text-gray-800">
                  {brainPredictionSteps[animationStep].title}
                </h4>
                <p className="text-sm text-gray-600">
                  {brainPredictionSteps[animationStep].description}
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <motion.div 
                className="h-full bg-neuroscience"
                initial={{ width: '0%' }}
                animate={{ width: `${(animationStep + 1) * (100 / brainPredictionSteps.length)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Show a circular connection between last and first step */}
            {animationStep === brainPredictionSteps.length - 1 && (
              <motion.svg 
                className="absolute top-2 right-2" 
                width="40" 
                height="40" 
                viewBox="0 0 40 40"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <circle cx="20" cy="20" r="18" fill="none" stroke="#d3f6f3" strokeWidth="2" />
                <path d="M20 10 L25 15 L15 15 Z" fill="#d3f6f3" />
              </motion.svg>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-5">
            {brainPredictionSteps.map((step, index) => (
              <div 
                key={index}
                className={`cursor-pointer ${index === animationStep ? 'font-semibold' : 'text-gray-500'}`}
                onClick={() => {
                  setAnimationStep(index);
                  setIsAutoPlaying(false);
                }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                    index === animationStep ? 'bg-neuroscience' : 
                    index < animationStep ? 'bg-gray-300' : 'bg-gray-200'
                  }`}>
                    <span className="text-xs">{index + 1}</span>
                  </div>
                  <span className="text-xs text-center">{step.title.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-md font-medium mb-2">Details</h4>
            <p className="text-sm">{brainPredictionSteps[animationStep].detail}</p>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>
              Brain prediction is an active process that forms a continuous loop of perception, prediction,
              action, and learning. This active inference framework allows the brain to constantly
              refine its model of the world through interaction with the environment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
