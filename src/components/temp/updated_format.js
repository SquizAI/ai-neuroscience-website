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
