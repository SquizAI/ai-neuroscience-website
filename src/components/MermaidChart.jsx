import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const conceptData = {
  'AI Development': {
    title: 'AI Development',
    description: 'The evolution of artificial intelligence approaches over time, branching into different methodologies.',
    details: 'AI development has seen multiple paradigm shifts, from rule-based systems to modern neural networks and beyond.'
  },
  'Current Scaling Approach': {
    title: 'Current Scaling Approach',
    description: 'The dominant paradigm in AI research focused on increasing model size, data, and compute resources.',
    details: 'This approach has led to impressive capabilities but faces fundamental limitations in efficiency and generalizability.'
  },
  'Neuroscience-Informed Approach': {
    title: 'Neuroscience-Informed Approach',
    description: 'An alternative paradigm that draws inspiration from how the human brain processes information.',
    details: 'By incorporating principles from neuroscience, these approaches aim to create more efficient and adaptive AI systems.'
  },
  'Larger Models': {
    title: 'Larger Models',
    description: 'Increasing the parameter count of neural networks.',
    details: 'Models have grown from millions to trillions of parameters, enabling more complex pattern recognition but requiring enormous resources.'
  },
  'More Data': {
    title: 'More Data',
    description: 'Training on increasingly vast datasets.',
    details: 'Modern AI systems consume petabytes of data during training, but quality and diversity remain significant challenges.'
  },
  'More Compute': {
    title: 'More Compute',
    description: 'Utilizing greater computational resources for training and inference.',
    details: 'The computational requirements for state-of-the-art AI have been doubling approximately every 3.4 months, far outpacing Moore\'s Law.'
  },
  'Predictive Processing': {
    title: 'Predictive Processing',
    description: 'The brain\'s mechanism for constantly predicting and updating its model of the world.',
    details: 'This approach focuses on building systems that continuously generate and refine predictions about their environment.'
  },
  'Free Energy Principle': {
    title: 'Free Energy Principle',
    description: 'A unified theory of brain function based on minimizing prediction errors.',
    details: 'This principle suggests that intelligent systems work to minimize the difference between their predictions and actual sensory inputs.'
  },
  'Hierarchical Processing': {
    title: 'Hierarchical Processing',
    description: 'Multi-level information processing that combines bottom-up and top-down flows.',
    details: 'The brain processes information across multiple hierarchical levels, with higher levels handling increasingly abstract concepts.'
  },
  'Limitations': {
    title: 'Limitations of Scaling',
    description: 'The inherent constraints of the pure scaling approach.',
    details: 'These include diminishing returns on performance, environmental impact, data exhaustion, and inability to capture certain aspects of human cognition.'
  },
  'Benefits': {
    title: 'Benefits of Neuroscience-Informed AI',
    description: 'The advantages of incorporating brain-inspired principles.',
    details: 'These include improved efficiency, better generalization to new situations, more robust learning, and potentially more aligned behavior.'
  },
  'Future of AI': {
    title: 'Future of AI',
    description: 'The potential convergence of scaling and neuroscience-informed approaches.',
    details: 'The most promising path forward likely combines the strengths of both paradigms, creating systems that are both powerful and efficient.'
  }
};

const MermaidChart = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const svgRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Make the SVG interactive by adding event listeners to all nodes
    const initializeInteractivity = () => {
      if (!svgRef.current) return;
      
      // Find all the clickable nodes in the SVG
      const nodes = svgRef.current.querySelectorAll('g.node rect, g.node circle, g.node ellipse, g.node polygon');
      
      if (nodes.length === 0) {
        console.log('No nodes found in SVG, will retry later');
        return false; // Signal that initialization failed
      }
      
      nodes.forEach(node => {
        // Get the parent g element which contains the text
        const parentG = node.closest('g.node');
        if (!parentG) return;
        
        // Find the text element to get the node title
        const textElement = parentG.querySelector('text');
        if (!textElement) return;
        
        const nodeTitle = textElement.textContent.trim();
        
        // Add hover effects
        node.style.cursor = 'pointer';
        node.style.transition = 'all 0.3s ease';
        
        node.addEventListener('mouseover', () => {
          node.style.filter = 'brightness(1.2)';
          node.style.transform = 'scale(1.05)';
        });
        
        node.addEventListener('mouseout', () => {
          node.style.filter = 'brightness(1)';
          node.style.transform = 'scale(1)';
        });
        
        // Add click handler
        parentG.addEventListener('click', () => {
          setSelectedNode(conceptData[nodeTitle] ? nodeTitle : null);
        });
      });
      
      setIsInteractive(true);
      return true; // Signal successful initialization
    };

    // Function to handle SVG loading
    const loadSVG = () => {
      const svgObject = document.querySelector('object[data="/concept-map.svg"]');
      
      if (svgObject && svgObject.contentDocument) {
        // Check if the SVG is fully loaded
        if (svgObject.contentDocument.readyState === 'complete' || 
            svgObject.contentDocument.readyState === 'interactive') {
          
          svgRef.current = svgObject.contentDocument;
          
          // Try to initialize interactivity
          const success = initializeInteractivity();
          
          // If initialization failed, we'll retry
          if (!success) {
            setTimeout(loadSVG, 500);
          }
        } else {
          // SVG not fully loaded yet, wait for it
          setTimeout(loadSVG, 500);
        }
      } else {
        // Fallback for the image version or if object not found yet
        const svgImage = document.querySelector('img[src="/chart.svg"]');
        if (svgImage && svgImage.complete) {
          // For the image version, create clickable overlays
          createClickableOverlays();
        } else {
          // Try again if neither is ready
          setTimeout(loadSVG, 500);
        }
      }
    };

    // Start the loading process with a small initial delay
    const timer = setTimeout(loadSVG, 300);

    return () => clearTimeout(timer);
  }, []);

  const createClickableOverlays = () => {
    // This would create clickable areas over the image based on known coordinates
    // Implementation depends on the exact layout of the image
    console.log("Creating clickable overlays for image version");
    setIsInteractive(true);
  };

  const handleBackClick = () => {
    setSelectedNode(null);
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 overflow-hidden">
      {!selectedNode ? (
        <>
          <div className="text-center">
            <object 
              type="image/svg+xml" 
              data="/concept-map.svg" 
              className="w-full h-auto mx-auto" 
              style={{ maxHeight: '500px' }}
            >
              {/* Fallback for browsers that don't support SVG objects */}
              <img 
                src="/chart.svg" 
                alt="AI and Neuroscience Conceptual Framework" 
                className="w-full h-auto rounded-md mb-2"
              />
            </object>
          </div>
          
          {isInteractive ? (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Click on any node to explore that concept in more detail
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-3 text-center">
              This diagram visualizes the relationships between AI approaches and neuroscience principles.
            </p>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="concept-detail p-6"
        >
          <button 
            onClick={handleBackClick}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to diagram
          </button>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {conceptData[selectedNode]?.title}
          </h3>
          
          <p className="text-lg text-gray-600 mb-4">
            {conceptData[selectedNode]?.description}
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">Key insights:</h4>
            <p className="text-gray-700">
              {conceptData[selectedNode]?.details}
            </p>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Related concepts:</h4>
            <div className="flex flex-wrap gap-2">
              {/* This would be dynamically generated based on the connections in the chart */}
              {Object.keys(conceptData)
                .filter(key => key !== selectedNode)
                .slice(0, 3)
                .map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedNode(key)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {conceptData[key].title}
                  </button>
                ))
              }
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MermaidChart;
