const fs = require('fs');

// Read the file
let content = fs.readFileSync('scenery/_baseline_diagraphe_demos.js', 'utf8');

// Find all element objects and add nature if missing
content = content.replace(
  /(\s+)elements: \[\s*\{\s*([^n][^a][^t][^u][^r][^e][^:][^"]*classes:)/g,
  '$1elements: [\n$1  {\n$1    nature: "rect",\n$1    $2'
);

// Write back
fs.writeFileSync('scenery/_baseline_diagraphe_demos.js', content);

console.log('Done adding nature properties to elements');