const fs = require('fs');

// Read the file
let content = fs.readFileSync('scenery/_baseline_diagraphe_demos.js', 'utf8');

// Split into lines
let lines = content.split('\n');

// Process each line
let inElements = false;
let result = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check if we're entering an elements array
    if (line.includes('elements: [')) {
        inElements = true;
    }

    // Check if we're exiting an elements array
    if (line.includes(']') && inElements && !line.includes('[')) {
        inElements = false;
    }

    // If we're in elements and this line has classes
    if (inElements && line.includes('classes:') && !line.includes('nature:')) {
        // Check if the previous line has nature
        let hasNature = false;
        for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
            if (lines[j].includes('nature:')) {
                hasNature = true;
                break;
            }
            if (lines[j].includes('{') || lines[j].includes('elements:')) {
                break;
            }
        }

        if (!hasNature) {
            // Add nature line before classes
            result.push('                nature: \'rect\',');
        }
    }

    result.push(line);
}

// Write back
fs.writeFileSync('scenery/_baseline_diagraphe_demos.js', result.join('\n'));

console.log('Done adding nature properties');