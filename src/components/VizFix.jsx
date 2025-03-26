// Add this to the beginning of your existing EnhancedMarkdown.jsx file
// Then simply replace the p component in your components object

// In the components object, replace your current p handling with this:
p: ({ node, children, ...props }) => {
  // Check for visualization tag format: {visualization:type}
  if (children && children.length === 1 && typeof children[0] === 'string') {
    const text = children[0];
    if (text.trim().startsWith('{visualization:') && text.trim().endsWith('}')) {
      const type = text.trim().substring(15, text.trim().length - 1);
      console.log('Found visualization in paragraph:', type);
      
      // Create a visualization here directly
      const Component = visualizationComponents[type];
      if (!Component) {
        return <p>Error: Visualization type '{type}' not found</p>;
      }
      
      const metadata = getVisualizationMetadata(type);
      
      return (
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className={`${metadata.gradientClass || 'bg-gradient-to-r from-blue-600 to-indigo-600'} p-4 border-b flex justify-between items-center`}>
            <div>
              <h3 className="text-lg font-semibold text-white">{metadata.title || 'Visualization'}</h3>
              <p className="text-sm text-white opacity-80">{metadata.description || 'Interactive visualization'}</p>
            </div>
            <button 
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white"
              aria-label="Expand to fullscreen"
              onClick={() => setFullscreenViz({ 
                type, 
                title: metadata.title || 'Visualization', 
                description: metadata.description || 'Interactive visualization'
              })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="p-6 bg-white h-[400px]">
            <Component />
          </div>
        </div>
      );
    }
  }
  
  // Default paragraph rendering
  return <p className="text-lg leading-relaxed text-gray-700 my-4" {...props}>{children}</p>;
}
