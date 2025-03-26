  // This function handles special tags to insert interactive components
  const processContent = (content) => {
    if (!content) {
      console.log('Warning: No content provided to processContent');
      return '';
    }
    
    let processed = content;
    
    console.log('Processing markdown content with visualization tags');
    
    // Handle visualization tags in different formats
    
    // Format 1: {visualization:type} - Convert to a special marker that ReactMarkdown will preserve
    processed = processed.replace(/\{visualization:([^}]+)\}/g, (match, type) => {
      console.log(`Converting tag format 1: ${match} with type: ${type.trim()}`);
      // Use a format that won't be escaped by ReactMarkdown
      return `<div class="visualization-container" data-type="${type.trim()}"></div>`;
    });
    
    // Format 2: <div class="visualization-container" data-type="type"></div>
    // Make sure these are on their own lines to prevent paragraph wrapping
    processed = processed.replace(/<div class="visualization-container" data-type="([^"]+)"><\/div>/g, (match, type) => {
      console.log(`Reformatting HTML visualization container with type: ${type}`);
      return `<div class="visualization-container" data-type="${type}"></div>`;
    });
    
    // Format 3: Plain text "visualization type" on its own line
    processed = processed.replace(/^visualization\s+([\w-]+)$/gm, (match, type) => {
      console.log(`Converting plain text visualization: ${match} with type: ${type.trim()}`);
      return `<div class="visualization-container" data-type="${type.trim()}"></div>`;
    });
    
    // Format 4: Special case for markdown files that use HTML comments with visualization tags
    processed = processed.replace(/<!--\s*visualization:([^>]+)\s*-->/g, (match, type) => {
      console.log(`Converting HTML comment visualization: ${match} with type: ${type.trim()}`);
      return `<div class="visualization-container" data-type="${type.trim()}"></div>`;
    });
    
    // Format 5: Handle HTML div tags with visualization-container class that appear in the book
    processed = processed.replace(/<div class=['"]visualization-container['"] data-type=['"]([^'"]+)['"]><\/div>/g, (match, type) => {
      console.log(`Found visualization container in book content: ${type}`);
      return `<div class="visualization-container" data-type="${type}"></div>`;
    });
    
    // Format 6: Handle escaped HTML tags that appear in the book content
    processed = processed.replace(/&lt;div class="visualization-container" data-type="([^"]+)"&gt;&lt;\/div&gt;/g, (match, type) => {
      console.log(`Converting escaped HTML visualization container: ${type}`);
      return `<div class="visualization-container" data-type="${type}"></div>`;
    });
    
    // Debug: Log the final processed content
    console.log('Final processed content contains visualization tags:', 
                processed.includes('visualization-container'));
    
    return processed;
  };
