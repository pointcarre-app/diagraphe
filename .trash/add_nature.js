const fs = require('fs');

// Read the file
let content = fs.readFileSync('scenery/_baseline_diagraphe_demos.js', 'utf8');

// Replace all element objects that start with classes but don't have nature
content = content.replace(
  /elements: \[\s*\{\s*classes:/g,
  'elements: [\n        {\n          nature: "rect",\n          classes:'
);

// Also handle the single-line format
content = content.replace(
  /elements: \[\{\s*classes:/g,
  'elements: [{\n                nature: "rect",\n                classes:'
);

// Write back
fs.writeFileSync('scenery/_baseline_diagraphe_demos.js', content);

console.log('Done adding nature properties');