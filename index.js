const fs = require("fs");

// Read the HTML file path from command-line args (default: input.html)
const inputPath = process.argv[2] || "input.html";
const htmlString = fs.readFileSync(inputPath, "utf-8");

// Regex to match >
const brandRegex = /<a\s+href="\/brands\/([^"]+)"[^>]*title="([^"]+)"[^>]*>/g;

const brandsData = [];
let match;
let id = 1;

// Extract all matches
while ((match = brandRegex.exec(htmlString)) !== null) {
  brandsData.push({
    id: id++,
    label: match[2],
    value: match[1],
  });
}

// Write the output module
fs.writeFileSync(
  "brandsData.js",
  "export const brandsData = " + JSON.stringify(brandsData, null, 2) + ";"
);

console.log(`brandsData.js file created with ${brandsData.length} brands.`);
