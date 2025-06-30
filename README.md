# Brand Link Extractor

A simple Node.js script that parses a user-provided HTML file containing brand links and generates a JavaScript module exporting an array of `{ id, label, value }` objects. Perfect for converting a list of `<a href="/brands/...">` elements into a structured data file.

## 🚀 Features

- Reads an input HTML file you supply
- Finds every `<a>` tag pointing to `/brands/...`
- Extracts the URL slug (`value`) and the human-readable title (`label`)
- Auto-increments an `id` for each brand entry
- Outputs a ready-to-import `brandsData.js` file

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) ≥ 12.x
- A terminal (bash, PowerShell, etc.)

## 📦 Installation

1. **Clone this repo**

   ```bash
   git clone https://github.com/<your-username>/brand-link-extractor.git
   cd brand-link-extractor
   ```

2. **(Optional) Install dependencies**
   > This project uses only Node’s built-in `fs` module; there are no external packages.
   ```bash
   npm install
   ```

## ⚙️ Usage

1. **Place your HTML file**  
   Save your HTML source as `input.html` in the project root (or pass a different filename).

2. **Run the script**

   ```bash
   node index.js input.html
   ```

3. **Inspect the output**  
   After running, you’ll have a new file `brandsData.js` exporting your extracted data:
   ```js
   export const brandsData = [
     { id: 1, label: "Chanel", value: "chanel" },
     { id: 2, label: "Charlotte Tilbury", value: "charlotte-tilbury" },
     // …
   ];
   ```

## 🔧 Data Structure

Each entry in `brandsData.js` follows this interface:

```ts
interface Brand {
  id: number; // Auto-incremented index (1, 2, 3…)
  label: string; // The title attribute from the <a> tag
  value: string; // The slug extracted from the href (after “/brands/”)
}
```

## 📋 Example

**`input.html`**:

```html
<ul>
  <li><a href="/brands/chanel" title="Chanel">Chanel</a></li>
  <li>
    <a href="/brands/charlotte-tilbury" title="Charlotte Tilbury"
      >Charlotte Tilbury</a
    >
  </li>
  <li><a href="/brands/bondi-sands" title="Bondi Sands">Bondi Sands</a></li>
</ul>
```

**Run**:

```bash
node index.js input.html
```

**Generated `brandsData.js`**:

```js
export const brandsData = [
  { id: 1, label: "Chanel", value: "chanel" },
  { id: 2, label: "Charlotte Tilbury", value: "charlotte-tilbury" },
  { id: 3, label: "Bondi Sands", value: "bondi-sands" },
];
```

## 📝 `index.js` (example)

```js
const fs = require("fs");

// Read the HTML file path from command-line args (default: input.html)
const inputPath = process.argv[2] || "input.html";
const htmlString = fs.readFileSync(inputPath, "utf-8");

// Regex to match <a href="/brands/SLUG" ... title="LABEL">
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
```

## 🔄 Customization

- **Change input path**  
  In `index.js`, modify:
  ```js
  const inputPath = "my-brands.html";
  ```
- **Rename output**  
  Change `"brandsData.js"` in the `fs.writeFileSync(...)` call to any desired filename or path.

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to your branch (`git push origin feature/awesome`)
5. Open a Pull Request

Please keep PRs focused and include tests or examples for new behavior.

## 📄 License

Distributed under the [MIT License](LICENSE). Feel free to use, modify, and distribute as you like!
