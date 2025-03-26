import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FreeEnergyPrinciple() {
  const [running, setRunning] = useState(false);
  const [predictionError, setPredictionError] = useState(50);
  const [modelBelief, setModelBelief] = useState(50);
  const [sensorValue, setSensorValue] = useState(80);
  const [freeEnergy, setFreeEnergy] = useState(0);
  const [steps, setSteps] = useState([]);

  // Calculate free energy as a function of prediction error
  useEffect(() => {
    const error = Math.abs(modelBelief - sensorValue);
    setPredictionError(error);
    setFreeEnergy((error * error) / 100); // Simplified free energy calculation
    
    if (running && steps.length < 10) {
      const timeout = setTimeout(() => {
        // Update the model belief to reduce prediction error (perception)
        const newBelief = modelBelief + (sensorValue - modelBelief) * 0.3;
        setModelBelief(newBelief);
        
        // Record step
        setSteps(prev => [...prev, {
          belief: newBelief,
          sensor: sensorValue,
          error: Math.abs(newBelief - sensorValue)
        }]);
      }, 800);
      
      return () => clearTimeout(timeout);
    }
  }, [modelBelief, sensorValue, running, steps.length]);

  const startSimulation = () => {
    setSteps([]);
    setModelBelief(50);
    setSensorValue(80);
    setRunning(true);
  };

  const resetSimulation = () => {
    setRunning(false);
    setSteps([]);
    setModelBelief(50);
    setSensorValue(80);
  };

  const changeSensorValue = (value) => {
    setSensorValue(value);
    // Reset steps when sensor value changes
    setSteps([]);
  };

  return (
    <div className="card p-6 bg-white">
      <h3 className="text-xl font-semibold mb-4">Interactive Free Energy Principle Simulation</h3>
      <p className="text-gray-600 mb-6">
        This visualization demonstrates how the brain minimizes free energy by updating internal models (perception)
        or taking actions to change sensory input (action).
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-4">Simulation Parameters</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sensory Input: {sensorValue}
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sensorValue} 
              onChange={(e) => changeSensorValue(Number(e.target.value))}
              className="w-full"
              disabled={running}
            />
            <p className="text-xs text-gray-500 mt-1">
              Represents the actual sensory data perceived from the environment
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Internal Model Belief: {modelBelief.toFixed(1)}
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-primary-600 h-2.5 rounded-full"
                initial={{ width: `${modelBelief}%` }}
                animate={{ width: `${modelBelief}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Represents the brain's internal model/prediction
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prediction Error: {predictionError.toFixed(1)}
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-red-500 h-2.5 rounded-full"
                initial={{ width: `${predictionError}%` }}
                animate={{ width: `${predictionError}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The difference between prediction and actual sensory input
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Free Energy: {freeEnergy.toFixed(1)}
            </label>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-yellow-500 h-2.5 rounded-full"
                initial={{ width: `${freeEnergy}%` }}
                animate={{ width: `${freeEnergy}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              A measure of the "surprise" (mathematically related to prediction error squared)
            </p>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-4">Perception Updates (Active Inference)</h4>
          
          <div className="h-48 overflow-y-auto mb-4 border border-gray-100 rounded p-2">
            {steps.length === 0 ? (
              <p className="text-gray-400 text-sm italic text-center mt-16">
                Start the simulation to see perception updates
              </p>
            ) : (
              steps.map((step, index) => (
                <div key={index} className="mb-2 text-sm">
                  <p><strong>Step {index + 1}:</strong></p>
                  <p>Model belief: {step.belief.toFixed(1)}</p>
                  <p>Sensory input: {step.sensor}</p>
                  <p>Prediction error: {step.error.toFixed(1)}</p>
                  <hr className="my-1 border-gray-100" />
                </div>
              ))
            )}
          </div>
          
          <div className="text-xs text-gray-600 mb-4">
            <p className="font-medium">Key Principles Demonstrated:</p>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>The brain continuously updates its internal model to minimize prediction error</li>
              <li>This process of updating beliefs is perception in the FEP framework</li>
              <li>Free energy decreases as the model better matches sensory input</li>
              <li>In real brains, both perception AND action work together to minimize free energy</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4 justify-center">
        <button 
          onClick={startSimulation} 
          disabled={running}
          className={`px-4 py-2 rounded-md ${running ? 'bg-gray-300' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
        >
          Start Simulation
        </button>
        <button 
          onClick={resetSimulation}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p className="font-medium">About this Visualization:</p>
        <p>
          This simplified simulation demonstrates Karl Friston's Free Energy Principle, showing how
          the brain updates its internal model (perception) to better match sensory input, thereby
          minimizing prediction error and free energy. In a complete implementation, the system would
          also take actions to change the sensory input itself.
        </p>
      </div>
    </div>
  );
}
