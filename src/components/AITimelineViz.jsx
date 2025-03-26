import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';

// Initialize mermaid with a custom theme
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#5D8AA8',
    primaryTextColor: '#fff',
    primaryBorderColor: '#5D8AA8',
    lineColor: '#444',
    secondaryColor: '#6BA5DE',
    tertiaryColor: '#9AC6FF'
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis'
  },
  securityLevel: 'loose'
});

const AITimelineViz = () => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.contentLoaded();
    }
  }, []);

  // Timeline diagram showing the progression of neuroscience concepts in AI
  const diagram = `
    timeline
      title AI Neuroscience Conceptual Timeline
      
      section Foundational Theories
        1940s-1950s: Neural Networks : McCulloch & Pitts neurons
        1980s-1990s: Connectionism : PDP models, Hinton
        2000s: Predictive Coding : Rao & Ballard, Friston
        2010s: Free Energy Principle : Friston, Active Inference
        
      section Biological Models
        1950s: Hebbian Learning : "Neurons that fire together, wire together"
        1970s: Attractor Networks : Hopfield networks
        2010s: Neural Dynamics : Metastability, Criticality
        2020s: Embodied Intelligence : Morphological computation
      
      section AI Developments
        1997: Deep Blue Beats Kasparov : Symbolic AI success
        2012: AlexNet : Deep learning revolution
        2017: Attention Mechanisms : Transformer architecture
        2020: GPT-3/4 & Large Language Models : Emergent capabilities
        2023+: Multimodal Systems : Cross-modal integration
      
      section Integrative Approaches
        2015: Deep Reinforcement Learning : AlphaGo
        2018: Neural Algorithmic Reasoning : DeepMind
        2022: Foundation Models : Scale-based emergence
        2024-2025: Neurosymbolic Systems : Hybrid approaches
  `;

  return (
    <motion.div 
      className="timeline-container my-8 p-6 bg-gray-50 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        The Evolution of AI & Neuroscience
      </h2>
      <div className="mermaid-timeline">
        <div className="mermaid" ref={mermaidRef}>
          {diagram}
        </div>
      </div>
      <div className="timeline-legend mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <div className="legend-item flex items-center">
          <span className="w-3 h-3 mr-1 inline-block bg-[#5D8AA8] rounded-full"></span>
          <span>Foundational Theory</span>
        </div>
        <div className="legend-item flex items-center">
          <span className="w-3 h-3 mr-1 inline-block bg-[#6BA5DE] rounded-full"></span>
          <span>Biological Insights</span>
        </div>
        <div className="legend-item flex items-center">
          <span className="w-3 h-3 mr-1 inline-block bg-[#9AC6FF] rounded-full"></span>
          <span>AI Implementation</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AITimelineViz;
