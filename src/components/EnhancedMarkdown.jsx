import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism } from 'react-syntax-highlighter';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AITimelineChart from './AITimelineChart';
import FreeEnergyPrinciple from './FreeEnergyPrinciple';
import ConsciousnessIntelligenceChart from './ConsciousnessIntelligenceChart';
import PredictionMechanismsComparison from './PredictionMechanismsComparison';
import ScalingLimitationsChart from './ScalingLimitationsChart';
import AIConceptMap from './AIConceptMap';
import AITimelineViz from './AITimelineViz';
import InteractiveBrain from './InteractiveBrain';
import NeuralNetworkAnimation from './NeuralNetworkAnimation';
import FreeEnergyVisualizer from './FreeEnergyVisualizer';
import MermaidChart from './MermaidChart';

// Map of visualization types to their components
const visualizationComponents = {
  'brain': InteractiveBrain,
  'neural-network': NeuralNetworkAnimation,
  'timeline': AITimelineViz,
  'fep': FreeEnergyPrinciple,
  'consciousness': ConsciousnessIntelligenceChart,
  'prediction': PredictionMechanismsComparison,
  'scaling': ScalingLimitationsChart,
  'conceptmap': AIConceptMap,
  'free-energy-viz': FreeEnergyVisualizer,
  'mermaid': MermaidChart
};

// Dynamic Visualization Component
const DynamicVisualization = ({ type, fullscreen = false }) => {
  // Get the component directly from the mapping
  const Component = visualizationComponents[type];
  
  // If component doesn't exist, show error
  if (!Component) {
    return (
      <div className="p-8 text-red-600 bg-red-50 rounded-lg border border-red-200 max-w-lg mx-auto">
        <p className="font-semibold mb-2">Error loading visualization</p>
        <p className="text-sm">Visualization type '{type}' not recognized</p>
      </div>
    );
  }
  
  // Render the component with the fullscreen prop
  try {
    return <Component fullscreen={fullscreen} />;
  } catch (error) {
    console.error(`Error rendering ${type} visualization:`, error);
    return (
      <div className="p-8 text-red-600 bg-red-50 rounded-lg border border-red-200 max-w-lg mx-auto">
        <p className="font-semibold mb-2">Error rendering visualization</p>
        <p className="text-sm">{error.message || 'An unknown error occurred'}</p>
      </div>
    );
  }
};

// Icons for expand/collapse functionality
const ExpandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const CollapseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

// Clean, minimalist fullscreen modal component for visualizations
const FullscreenModal = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-white z-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="w-full h-full flex flex-col overflow-hidden"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on content
      >
        <div className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 border-b border-gray-200 z-10">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close fullscreen view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-auto p-8 flex justify-center items-center relative bg-white">
          <motion.div
            className="w-full h-full flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-md text-gray-500 text-sm text-center max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <p>Interact with the visualization using your mouse or touch gestures</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EnhancedMarkdown = ({ content }) => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [fullscreenViz, setFullscreenViz] = useState(null);
  
  // Track scroll position to highlight current section in the table of contents
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3');
      let current = '';

      headings.forEach(heading => {
        const sectionTop = heading.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = heading.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Listen for custom openVisualization events
  useEffect(() => {
    const handleOpenVisualization = (event) => {
      const { type, title, description } = event.detail;
      setFullscreenViz({ type, title, description });
    };
    
    document.addEventListener('openVisualization', handleOpenVisualization);
    return () => document.removeEventListener('openVisualization', handleOpenVisualization);
  }, []);
  
  // Helper function to get visualization metadata
  const getVisualizationMetadata = (type) => {
    const visualizationTypes = {
      'brain': {
        title: 'Interactive Brain Model',
        description: 'Explore the regions of the brain involved in cognitive processes',
        gradientClass: 'bg-gradient-to-r from-purple-600 to-blue-600',
        borderClass: 'border-purple-100'
      },
      'neural-network': {
        title: 'Neural Network Dynamics',
        description: 'Visualize how neural networks process information',
        gradientClass: 'bg-gradient-to-r from-blue-600 to-cyan-600',
        borderClass: 'border-blue-100'
      },
      'timeline': {
        title: 'AI Development Timeline',
        description: 'Key milestones in the development of artificial intelligence',
        gradientClass: 'bg-gradient-to-r from-indigo-600 to-purple-600',
        borderClass: 'border-indigo-100'
      },
      'fep': {
        title: 'Free Energy Principle',
        description: 'Interactive visualization of the Free Energy Principle',
        gradientClass: 'bg-gradient-to-r from-green-600 to-teal-600',
        borderClass: 'border-green-100'
      },
      'consciousness': {
        title: 'Consciousness & Intelligence',
        description: 'Exploring the relationship between consciousness and intelligence',
        gradientClass: 'bg-gradient-to-r from-pink-600 to-rose-600',
        borderClass: 'border-pink-100'
      },
      'prediction': {
        title: 'Prediction Mechanisms',
        description: 'Comparing prediction mechanisms in the brain and AI',
        gradientClass: 'bg-gradient-to-r from-amber-600 to-orange-600',
        borderClass: 'border-amber-100'
      },
      'scaling': {
        title: 'Scaling Limitations',
        description: 'Visualizing the limitations of the scaling paradigm',
        gradientClass: 'bg-gradient-to-r from-red-600 to-rose-600',
        borderClass: 'border-red-100'
      },
      'conceptmap': {
        title: 'AI Concept Map',
        description: 'Interactive map of key AI concepts and their relationships',
        gradientClass: 'bg-gradient-to-r from-sky-600 to-blue-600',
        borderClass: 'border-sky-100'
      },
      'free-energy-viz': {
        title: 'Free Energy Visualizer',
        description: 'Interactive visualization of free energy principles',
        gradientClass: 'bg-gradient-to-r from-emerald-600 to-green-600',
        borderClass: 'border-emerald-100'
      },
      'mermaid': {
        title: 'AI and Neuroscience Relationships',
        description: 'Interactive chart showing relationships between AI approaches and neuroscience principles',
        gradientClass: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        borderClass: 'border-blue-100'
      }
    };
    
    return visualizationTypes[type] || {
      title: 'Interactive Visualization',
      description: 'Explore this interactive visualization',
      gradientClass: 'bg-gradient-to-r from-gray-600 to-gray-700',
      borderClass: 'border-gray-100'
    };
  };

  // Custom component for handling visualization tags
  const VisualizationComponent = ({ type }) => {
    // Get metadata for visualization styling
    const visualizationMetadata = {
      'brain': {
        title: 'Interactive Brain Model',
        description: 'Explore the regions of the brain involved in cognitive processes',
        gradientClass: 'bg-gradient-to-r from-purple-600 to-blue-600'
      },
      'neural-network': {
        title: 'Neural Network Dynamics',
        description: 'Visualize how neural networks process information',
        gradientClass: 'bg-gradient-to-r from-blue-600 to-cyan-600'
      },
      'timeline': {
        title: 'AI Development Timeline',
        description: 'Key milestones in the development of artificial intelligence',
        gradientClass: 'bg-gradient-to-r from-indigo-600 to-purple-600'
      },
      'fep': {
        title: 'Free Energy Principle',
        description: 'Interactive visualization of the Free Energy Principle',
        gradientClass: 'bg-gradient-to-r from-green-600 to-teal-600'
      },
      'consciousness': {
        title: 'Consciousness & Intelligence',
        description: 'Exploring the relationship between consciousness and intelligence',
        gradientClass: 'bg-gradient-to-r from-pink-600 to-rose-600'
      },
      'prediction': {
        title: 'Prediction Mechanisms',
        description: 'Comparing different predictive processing mechanisms',
        gradientClass: 'bg-gradient-to-r from-amber-600 to-orange-600'
      },
      'scaling': {
        title: 'Scaling Limitations',
        description: 'Visualizing the diminishing returns of scaling AI models',
        gradientClass: 'bg-gradient-to-r from-red-600 to-orange-600'
      },
      'conceptmap': {
        title: 'AI Concepts Map',
        description: 'Mapping the relationships between key AI concepts',
        gradientClass: 'bg-gradient-to-r from-sky-600 to-blue-600'
      },
      'free-energy-viz': {
        title: 'Free Energy Visualizer',
        description: 'Interactive visualization of free energy principles',
        gradientClass: 'bg-gradient-to-r from-emerald-600 to-green-600'
      },
      'mermaid': {
        title: 'Concept Diagram',
        description: 'Visualized relationships between key concepts',
        gradientClass: 'bg-gradient-to-r from-blue-600 to-indigo-600'
      }
    };
    
    // Get metadata for this type or use defaults
    const metadata = visualizationMetadata[type] || {
      title: 'Interactive Visualization',
      description: 'Explore this interactive visualization',
      gradientClass: 'bg-gradient-to-r from-gray-600 to-gray-700'
    };
    
    // DEBUG
    console.log(`Rendering visualization component for type: ${type}`);
    
    return (
      <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className={`${metadata.gradientClass} p-4 border-b flex justify-between items-center`}>
          <div>
            <h3 className="text-lg font-semibold text-white">{metadata.title}</h3>
            <p className="text-white text-opacity-80 text-sm">{metadata.description}</p>
          </div>
          <button
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white"
            aria-label="Expand to fullscreen"
            onClick={() => setFullscreenViz({
              type,
              title: metadata.title,
              description: metadata.description
            })}
          >
            <ExpandIcon />
          </button>
        </div>
        <div className="p-6 bg-white flex justify-center items-center" style={{ height: '400px', position: 'relative' }}>
          <DynamicVisualization type={type} />
        </div>
      </div>
    );
  };

  // Process the content for rendering
  const processContent = (content) => {
    if (!content) {
      console.log('Warning: No content provided to processContent');
      return '';
    }
    
    let processed = content;
    
    // Process for special image tags with captions
    processed = processed.replace(/!\[([^\]]*)\]\(([^\)]+)\)\s*\*\*Caption:\*\*\s*([^\n]+)/g, 
      '<figure class="my-8"><img src="$2" alt="$1" class="rounded-lg w-full"/><figcaption class="text-center text-sm text-gray-600 mt-2">$3</figcaption></figure>');
      
    // Process for special code blocks
    processed = processed.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g, (match, language, code) => {
      return `<div class="code-block-wrapper">
        <pre class="language-${language}">
          <code class="language-${language}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
        </pre>
      </div>`;
    });
    
    // Process for special callout blocks
    processed = processed.replace(/:::([a-zA-Z]*)\s*([\s\S]*?):::/g, (match, type, content) => {
      let icon, bgColor, borderColor, textColor;
      
      switch(type.toLowerCase()) {
        case 'note':
          icon = '️ℹ️';
          bgColor = 'bg-blue-50';
          borderColor = 'border-blue-200';
          textColor = 'text-blue-800';
          break;
        case 'warning':
          icon = '⚠️';
          bgColor = 'bg-yellow-50';
          borderColor = 'border-yellow-200';
          textColor = 'text-yellow-800';
          break;
        case 'danger':
          icon = '🚫';
          bgColor = 'bg-red-50';
          borderColor = 'border-red-200';
          textColor = 'text-red-800';
          break;
        case 'tip':
          icon = '💡';
          bgColor = 'bg-green-50';
          borderColor = 'border-green-200';
          textColor = 'text-green-800';
          break;
        default:
          icon = '📝';
          bgColor = 'bg-gray-50';
          borderColor = 'border-gray-200';
          textColor = 'text-gray-800';
      }
      
      return `<div class="${bgColor} ${textColor} p-4 rounded-lg border ${borderColor} my-6">
        <div class="flex items-start">
          <div class="mr-3 text-xl">${icon}</div>
          <div>${content}</div>
        </div>
      </div>`;
    });
    
    // Log if we find visualization tags
    const visualizationTagsMatch = processed.match(/\{visualization:([a-z0-9-_]+)\}/g);
    if (visualizationTagsMatch) {
      console.log('Found visualization tags:', visualizationTagsMatch);
    }
    
    return processed;
  };

  // Custom components for the markdown renderer
  const components = {
    // Basic text components with custom styling
    h1: ({ node, ...props }) => {
      const id = props.children
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      
      return (
        <h1 id={id} className="text-3xl font-medium mt-12 mb-6 text-gray-900 border-b pb-3 border-gray-200 relative" {...props}>
          {props.children}
        </h1>
      );
    },
    h2: ({ node, ...props }) => {
      const id = props.children
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      
      return (
        <h2 id={id} className="text-2xl font-medium mt-10 mb-4 text-gray-800 relative" {...props}>
          {props.children}
        </h2>
      );
    },
    h3: ({ node, ...props }) => {
      const id = props.children
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      
      return (
        <h3 id={id} className="text-xl font-medium mt-8 mb-3 text-gray-800 relative" {...props}>
          {props.children}
        </h3>
      );
    },
    h4: ({ node, ...props }) => (
      <h4 className="text-lg font-medium mt-6 mb-2 text-gray-800" {...props} />
    ),
    p: ({ node, ...props }) => {
      // Handle visualization tags specifically
      if (props.children && props.children.length === 1 && typeof props.children[0] === 'string') {
        const text = props.children[0];
        // Use a more lenient regex pattern that can handle whitespace and newlines
        const match = text.trim().match(/^\s*\{visualization:([a-z0-9-_]+)\}\s*$/);
        if (match) {
          const vizType = match[1];
          console.log(`Rendering visualization: ${vizType}`);
          try {
            // Check if the component exists
            if (visualizationComponents[vizType]) {
              return <VisualizationComponent type={vizType} />;
            } else {
              console.error(`Visualization component not found for type: ${vizType}`);
              return (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 my-4">
                  <p>Visualization type not found: {vizType}</p>
                </div>
              );
            }
          } catch (error) {
            console.error(`Error rendering visualization ${vizType}:`, error);
            return (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 my-4">
                <p>Error rendering visualization: {error.message}</p>
              </div>
            );
          }
        }
      }
      return <p className="text-lg leading-relaxed text-gray-700 my-4" {...props} />;
    },
    
    // Links with custom styling and target blank for external links
    a: ({ node, href, ...props }) => {
      const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
      return (
        <a 
          href={href} 
          className="text-primary-600 hover:text-primary-800 transition-colors" 
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props} 
        />
      );
    },
    
    // Images with custom styling and click-to-expand functionality
    img: ({ node, src, alt, ...props }) => {
      return (
        <div className="my-6">
          <img 
            src={src} 
            alt={alt} 
            className="rounded-lg w-full cursor-pointer hover:opacity-95 transition-opacity" 
            onClick={() => setExpandedImage({ src, alt })}
            {...props} 
          />
        </div>
      );
    },
    
    // Lists with custom styling
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 space-y-2 my-4" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="text-gray-700 leading-relaxed" {...props} />
    ),
    
    // Code blocks with syntax highlighting
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          style={vscDarkPlus}
          PreTag="div"
          className="rounded-md my-4"
          showLineNumbers={true}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    
    // Block quotes with custom styling
    blockquote: ({ node, ...props }) => (
      <blockquote className="pl-4 border-l-4 border-gray-200 italic text-gray-700 my-6" {...props} />
    ),
    
    // Table styling
    table: ({ node, ...rest }) => <table className="w-full border-collapse my-6" {...rest} />,
    thead: ({ node, ...rest }) => <thead className="bg-gray-50" {...rest} />,
    th: ({ node, ...rest }) => (
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider" {...rest} />
    ),
    tbody: ({ node, ...rest }) => <tbody className="bg-white divide-y divide-gray-200" {...rest} />,
    tr: ({ node, ...rest }) => <tr className="hover:bg-gray-50 transition-colors duration-150" {...rest} />,
    td: ({ node, ...rest }) => <td className="px-6 py-4 text-base text-gray-700" {...rest} />,
  };

  // Render the markdown with custom components
  // Split content into segments based on visualization tags
  const renderContent = () => {
    // If no content, return empty
    if (!content) return null;
    
    // Simple regex to find visualization tags
    const visualizationPattern = /\{visualization:([a-z0-9-_]+)\}/g;
    
    // Split the content by visualization tags
    let segments = [];
    let lastIndex = 0;
    let match;
    
    // Create a new regex instance for each iteration
    const regex = new RegExp(visualizationPattern);
    
    // Find all matches
    while ((match = regex.exec(content)) !== null) {
      // Add the text segment before the visualization tag
      if (match.index > lastIndex) {
        segments.push({
          type: 'markdown',
          content: content.substring(lastIndex, match.index)
        });
      }
      
      // Add the visualization segment
      const vizType = match[0].substring(14, match[0].length - 1);
      segments.push({
        type: 'visualization',
        vizType
      });
      
      lastIndex = regex.lastIndex;
    }
    
    // Add any remaining content
    if (lastIndex < content.length) {
      segments.push({
        type: 'markdown',
        content: content.substring(lastIndex)
      });
    }
    
    console.log('Content segments:', segments);
    
    // Render all segments
    return segments.map((segment, index) => {
      if (segment.type === 'markdown') {
        return (
          <div key={`md-${index}`} className="prose-headings:text-gray-900 prose-headings:font-medium prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:border-b prose-h1:pb-3 prose-h1:border-gray-200 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-gray-800 prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 prose-p:my-4 prose-li:text-lg prose-li:text-gray-700">
            <ReactMarkdown 
              components={components}
              remarkPlugins={[]}
              rehypePlugins={[]}
              skipHtml={false}
              unwrapDisallowed={false}
            >
              {processContent(segment.content)}
            </ReactMarkdown>
          </div>
        );
      } else if (segment.type === 'visualization') {
        try {
          console.log(`Rendering visualization component: ${segment.vizType}`);
          if (!visualizationComponents[segment.vizType]) {
            return (
              <div key={`viz-${index}`} className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 my-8">
                <p>Visualization type not found: {segment.vizType}</p>
              </div>
            );
          }
          return <VisualizationComponent key={`viz-${index}`} type={segment.vizType} />;
        } catch (error) {
          console.error(`Error rendering visualization ${segment.vizType}:`, error);
          return (
            <div key={`viz-error-${index}`} className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 my-8">
              <p>Error rendering visualization: {error.message}</p>
            </div>
          );
        }
      }
      return null;
    });
  };

  return (
    <div className="enhanced-markdown prose prose-lg max-w-none">
      {/* Render the content with visualizations */}
      {renderContent()}
      
      {/* Fullscreen image modal with enhanced styling */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
          >
            <motion.div 
              className="relative max-w-5xl max-h-full overflow-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button 
                className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedImage(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img 
                src={expandedImage.src} 
                alt={expandedImage.alt} 
                className="max-w-full max-h-[90vh] object-contain"
              />
              {expandedImage.alt && (
                <div className="bg-white bg-opacity-80 p-3 text-center text-gray-800 mt-2 rounded">
                  {expandedImage.alt}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Fullscreen visualization modal */}
      <AnimatePresence>
        {fullscreenViz && (
          <FullscreenModal
            isOpen={!!fullscreenViz}
            onClose={() => setFullscreenViz(null)}
            title={fullscreenViz.title}
            description={fullscreenViz.description}
          >
            <div className="w-full h-full flex justify-center items-center">
              <DynamicVisualization type={fullscreenViz.type} fullscreen={true} />
            </div>
          </FullscreenModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMarkdown;
