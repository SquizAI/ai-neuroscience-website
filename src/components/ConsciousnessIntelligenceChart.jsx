import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ConsciousnessIntelligenceChart({ isFullscreen = false }) {
  const [selectedEntity, setSelectedEntity] = useState(null);
  
  const entities = [
    {
      id: 'human',
      name: 'Human',
      x: 85, // consciousness
      y: 85, // intelligence
      description: 'Humans possess both high consciousness and intelligence. Consciousness includes self-awareness, subjective experience, and phenomenal states. Intelligence includes problem-solving, learning, and goal-directed behavior.',
      features: {
        embodiment: true,
        homeostasis: true,
        interoception: true,
        unifiedPerspective: true
      }
    },
    {
      id: 'llm',
      name: 'Large Language Model',
      x: 5,  // consciousness
      y: 70, // intelligence
      description: 'LLMs demonstrate high intelligence in narrow domains like language processing but lack key prerequisites for consciousness such as embodiment, interoception, and homeostatic drives.',
      features: {
        embodiment: false,
        homeostasis: false,
        interoception: false,
        unifiedPerspective: false
      }
    },
    {
      id: 'dog',
      name: 'Dog',
      x: 60, // consciousness
      y: 45, // intelligence
      description: 'Dogs exhibit significant consciousness with emotional states and subjective experiences, but more limited intelligence compared to humans. They have all key prerequisites for consciousness.',
      features: {
        embodiment: true,
        homeostasis: true,
        interoception: true,
        unifiedPerspective: true
      }
    },
    {
      id: 'robot',
      name: 'Embodied AI Robot',
      x: 15, // consciousness
      y: 65, // intelligence
      description: 'Embodied robots possess some physical grounding but still lack true interoception and unified perspective. They demonstrate intelligence in specific domains.',
      features: {
        embodiment: true,
        homeostasis: false,
        interoception: false,
        unifiedPerspective: false
      }
    },
    {
      id: 'octopus',
      name: 'Octopus',
      x: 70, // consciousness
      y: 55, // intelligence
      description: 'Octopuses have complex consciousness with a very different neural organization than mammals, showing that consciousness can arise from diverse neural architectures.',
      features: {
        embodiment: true,
        homeostasis: true,
        interoception: true,
        unifiedPerspective: true
      }
    },
    {
      id: 'theoretical',
      name: 'Theoretical Neuroscience-based AI',
      x: 40, // consciousness
      y: 90, // intelligence
      description: 'A hypothetical future AI incorporating neuroscience principles might develop significant consciousness-like properties while maintaining high intelligence.',
      features: {
        embodiment: true,
        homeostasis: true,
        interoception: true,
        unifiedPerspective: true
      }
    }
  ];
  
  const consciousnessLevels = [
    { value: 0, label: 'None' },
    { value: 25, label: 'Minimal' },
    { value: 50, label: 'Moderate' },
    { value: 75, label: 'Significant' },
    { value: 100, label: 'Complete' }
  ];
  
  const intelligenceLevels = [
    { value: 0, label: 'None' },
    { value: 25, label: 'Minimal' },
    { value: 50, label: 'Moderate' },
    { value: 75, label: 'Significant' },
    { value: 100, label: 'Human+' }
  ];

  return (
    <div className={`${isFullscreen ? 'w-full h-full' : 'card p-6 bg-white'}`}>
      {/* Only show heading and description if not in fullscreen mode */}
      {!isFullscreen && (
        <>
          <h3 className="text-xl font-semibold mb-4">Consciousness vs. Intelligence: Seth's Framework</h3>
          <p className="text-gray-600 mb-6">
            This visualization maps various entities on the dimensions of consciousness and intelligence,
            illustrating Anil Seth's perspective on the dissociation between these two phenomena.
          </p>
        </>
      )}
      
      <div className={`grid grid-cols-1 ${isFullscreen ? 'lg:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
        <div className={`${isFullscreen ? 'lg:col-span-3' : 'md:col-span-2'}`}>
          <div className={`relative border border-gray-200 rounded-lg p-4 ${isFullscreen ? 'h-[600px]' : 'h-96'}`}>
            {/* Y-Axis (Intelligence) */}
            <div className="absolute left-4 top-0 bottom-8 w-px bg-gray-300 flex flex-col justify-between items-center">
              <div className="absolute -left-16 top-0 text-xs">Intelligence</div>
              {intelligenceLevels.map((level) => (
                <div key={level.value} className="absolute -left-16" style={{ bottom: `${level.value}%` }}>
                  <div className="text-xs text-gray-500">{level.label}</div>
                </div>
              ))}
            </div>
            
            {/* X-Axis (Consciousness) */}
            <div className="absolute left-4 right-0 bottom-8 h-px bg-gray-300 flex justify-between items-center">
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">Consciousness</div>
              {consciousnessLevels.map((level) => (
                <div key={level.value} className="absolute -bottom-6" style={{ left: `${level.value}%` }}>
                  <div className="text-xs text-gray-500">{level.label}</div>
                </div>
              ))}
            </div>
            
            {/* Plot area */}
            <div className="absolute left-4 right-0 top-0 bottom-8">
              {entities.map((entity) => (
                <motion.div
                  key={entity.id}
                  className={`absolute rounded-full cursor-pointer border-2 flex items-center justify-center
                    ${selectedEntity?.id === entity.id ? 'border-primary-600 shadow-lg' : 'border-gray-400'}`}
                  style={{
                    left: `${entity.x}%`,
                    bottom: `${entity.y}%`,
                    width: 30,
                    height: 30,
                    transform: 'translate(-50%, 50%)',
                    backgroundColor: entity.id === 'theoretical' ? 'rgba(211, 246, 243, 0.8)' : 
                               entity.id === 'llm' ? 'rgba(249, 213, 229, 0.8)' : 'rgba(238, 238, 238, 0.8)'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * entities.indexOf(entity) }}
                  onClick={() => setSelectedEntity(entity)}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-xs font-bold">{entity.name.charAt(0)}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {entities.map((entity) => (
              <div
                key={entity.id}
                className={`px-3 py-1 rounded-full text-xs cursor-pointer
                  ${selectedEntity?.id === entity.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setSelectedEntity(entity)}
              >
                {entity.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-4">
            {selectedEntity ? selectedEntity.name : 'Select an Entity'}
          </h4>
          
          {selectedEntity ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Consciousness</span>
                  <span className="text-sm font-medium">{selectedEntity.x}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-neuroscience h-1.5 rounded-full" 
                    style={{ width: `${selectedEntity.x}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Intelligence</span>
                  <span className="text-sm font-medium">{selectedEntity.y}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-scaling h-1.5 rounded-full" 
                    style={{ width: `${selectedEntity.y}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{selectedEntity.description}</p>
              
              <h5 className="text-sm font-medium mb-2">Consciousness Prerequisites:</h5>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedEntity.features.embodiment ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Embodiment</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedEntity.features.homeostasis ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Homeostatic Drives</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedEntity.features.interoception ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Interoception</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${selectedEntity.features.unifiedPerspective ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Unified Perspective</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Click on any entity in the chart to see detailed information about its consciousness and intelligence characteristics according to Seth's framework.
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p className="font-medium">About this Visualization:</p>
        <p>
          Based on Anil Seth's work, this chart illustrates how consciousness and intelligence can be dissociated.
          Seth argues that consciousness emerges from biological systems maintaining homeostasis, with the brain's primary
          role being to regulate physiological states. This contrasts with AI systems, which may exhibit intelligence
          without the embodied prerequisites for consciousness.
        </p>
      </div>
    </div>
  );
}
