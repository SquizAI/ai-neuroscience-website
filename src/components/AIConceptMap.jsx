import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';

const AIConceptMap = ({ isFullscreen = false }) => {
  const mermaidRef = useRef(null);

  // Define mermaid diagram content before using it in useEffect
  const mermaidDefinition = `
    flowchart TD
      %% Main Concepts
      AGI[Artificial General Intelligence]
      ScalingP[Scaling Paradigm]
      NeuroI[Neuroscience Insights]
      
      %% Scaling Limitations
      ScalingL[Scaling Limitations]
      TheoL[Theoretical Limitations]
      PracL[Practical Limitations]
      EmerA[Emergent Abilities]
      UnprePhen[Unpredictable Phenomena]
      
      %% Neuroscience Principles
      FEP[Free Energy Principle]
      ActInf[Active Inference]
      Meta[Metastability]
      EmbCog[Embodied Cognition]
      
      %% Consciousness vs. Intelligence
      ConsInt[Consciousness vs Intelligence]
      AniSeth[Anil Seth's Framework]
      BeastM[Beast Machine Theory]
      PredInt[Predictive Interoception]
      
      %% Prediction Mechanisms
      PredMech[Prediction Mechanisms]
      PasPred[Passive Prediction - AI]
      ActPred[Active Prediction - Brain]
      Agency[Agency Without Intelligence]
      
      %% Practical Applications
      PracRec[Practical Recommendations]
      AIArch[AI Architectures]
      ResDir[Research Directions]
      EthCon[Ethical Considerations]

      %% Relationships - Main Structure
      AGI --> ScalingP
      AGI --> NeuroI
      
      %% Scaling Branch
      ScalingP --> ScalingL
      ScalingL --> TheoL
      ScalingL --> PracL
      ScalingL --> EmerA
      EmerA --> UnprePhen
      
      %% Neuroscience Branch
      NeuroI --> FEP
      NeuroI --> Meta
      NeuroI --> EmbCog
      NeuroI --> ConsInt
      NeuroI --> PredMech
      
      %% FEP and Active Inference
      FEP --> ActInf
      
      %% Consciousness vs Intelligence
      ConsInt --> AniSeth
      AniSeth --> BeastM
      AniSeth --> PredInt
      
      %% Prediction Mechanisms
      PredMech --> PasPred
      PredMech --> ActPred
      PredMech --> Agency
      
      %% Practical Applications
      FEP & Meta & EmbCog & PredMech --> PracRec
      PracRec --> AIArch
      PracRec --> ResDir
      PracRec --> EthCon
      
      %% Styling
      classDef scaling fill:#f9d5e5,stroke:#333,stroke-width:1px
      classDef neuro fill:#d3f6f3,stroke:#333,stroke-width:1px
      classDef practical fill:#eeeeee,stroke:#333,stroke-width:1px
      
      class ScalingP,ScalingL,TheoL,PracL,EmerA,UnprePhen scaling
      class FEP,ActInf,Meta,EmbCog,ConsInt,AniSeth,BeastM,PredInt,PredMech,PasPred,ActPred,Agency neuro
      class PracRec,AIArch,ResDir,EthCon practical
  `;

  useEffect(() => {
    // Initialize mermaid with appropriate settings
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis',
        // Adjust size based on fullscreen mode
        width: isFullscreen ? '100%' : '800px',
        height: isFullscreen ? '800px' : '500px'
      },
      logLevel: 'fatal', // Reduce console noise
      fontFamily: 'sans-serif' // Ensure consistent font rendering
    });
    
    // Render the diagram after component mounts or when fullscreen status changes
    const renderChart = async () => {
      if (mermaidRef.current) {
        try {
          // Clear previous content
          mermaidRef.current.innerHTML = '';
          
          // Create a unique ID for this diagram
          const id = `mermaid-${Date.now()}`;
          
          // Use mermaid.render instead of direct DOM manipulation and mermaid.run
          // This is more reliable for SVG rendering
          const { svg } = await mermaid.render(id, mermaidDefinition);
          
          // Set the rendered SVG as the content
          mermaidRef.current.innerHTML = svg;
          
          // Add event listeners for interactive elements if needed
          const svgElement = mermaidRef.current.querySelector('svg');
          if (svgElement) {
            // Ensure SVG takes full width of container
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', isFullscreen ? '800px' : '500px');
            svgElement.style.maxWidth = '100%';
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          // Provide a fallback display in case of error
          mermaidRef.current.innerHTML = '<div class="p-4 bg-red-100 text-red-800 rounded">Error rendering concept map. Please refresh.</div>';
        }
      }
    };
    
    // Longer delay to ensure DOM is fully ready before rendering
    const timer = setTimeout(() => {
      renderChart();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isFullscreen, mermaidDefinition]); // Re-render when fullscreen status or definition changes

  return (
    <motion.div 
      className={`ai-concept-map ${isFullscreen ? 'fullscreen p-8' : 'card p-6 my-8'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isFullscreen && <h3 className="heading-3 mb-4">AI Neuroscience Concept Map</h3>}
      <div className={`concept-map-container overflow-auto ${isFullscreen ? 'h-full min-h-[600px]' : ''}`}>
        <div ref={mermaidRef}></div>
      </div>
      <div className={`${isFullscreen ? 'mt-8' : 'mt-4'} text-sm text-gray-600`}>
        <div className="flex items-center space-x-4 flex-wrap">
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-pink-200 border border-gray-300 mr-2"></div>
            <span>Scaling Paradigm</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-teal-100 border border-gray-300 mr-2"></div>
            <span>Neuroscience Insights</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-gray-200 border border-gray-300 mr-2"></div>
            <span>Practical Applications</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIConceptMap;
