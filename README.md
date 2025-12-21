# Diagraphe


## Scenery main access



### Locally


[localhost:8070](http://localhost:8070/)

```
python3 serve.py

% python3 serve.py

============================================================
📐SM DIAGRAPHE SERVER STARTING 📐SM
============================================================
📡 PORT REUSE ENABLED - No more 'Address already in use' errors! 🎉
🌐 CORS ENABLED - Cross-origin requests allowed 🔓
============================================================
🔥 Server blazing at http://localhost:8070/ 🔥
⚡ Press Ctrl+C to stop the server ⚡
============================================================

```


### Github Pages

[Scenery link](https://pointcarre-app.github.io/diagraphe/scenery/)


### CDN Distribution

#### GitHub Raw CDN (Immediate)
- **Test Page**: https://pointcarre-app.github.io/diagraphe/scenery/test-github-cdn.html
- **Library**: `https://raw.githubusercontent.com/pointcarre-app/diagraphe/v0.0.1/src/diagraphe.js`
- **Demos**: `https://raw.githubusercontent.com/pointcarre-app/diagraphe/v0.0.1/scenery/_sujets0_katex_demos.js`

#### jsDelivr CDN (After Indexing)
- **Test Page**: https://pointcarre-app.github.io/diagraphe/scenery/test-cdn.html
- **Library**: `https://cdn.jsdelivr.net/npm/diagraphe@0.0.1/src/diagraphe.js`
- **Demos**: `https://cdn.jsdelivr.net/npm/diagraphe@0.0.1/scenery/_sujets0_katex_demos.js`


## Tree

```
├── dependencies
│   ├── daisyui@5.css                    # DaisyUI main CSS file
│   ├── daisyui@5themes.css              # DaisyUI themes CSS file
│   ├── google_fonts.css                 # Google Fonts CSS file
│   ├── open_dyslexic_regular.css        # Open Dyslexic Regular font CSS file
│   └── tailwindcssbrowser@4.js          # Tailwind CSS browser JavaScript file
├── experiments
│   └── viewbox-explained.html           # ViewBox explained HTML file
├── README.md                            # README file
├── scenery
│   ├── _baseline_diagraphe_demos.js     # Baseline Diagraphe demos JavaScript file
│   ├── _baseline.html                   # Baseline scenery HTML file
│   ├── _basic_shapes.html               # Basic shapes demonstrations
│   ├── _cartesian.html                  # Cartesian coordinate systems
│   ├── _curves2.html                    # Curve plotting examples
│   ├── _dynamic.html                    # Interactive editing interface
│   ├── _heatmap.html                    # Heatmap visualizations
│   ├── _nagini.html                     # Nagini scenery HTML file
│   ├── _sujets0_katex_demos.js          # KaTeX mathematical demos
│   ├── _tree.html                       # Tree diagram examples
│   ├── index.html                       # Main scenery HTML file
│   ├── sujets0_katex.html               # KaTeX mathematical examples
│   ├── sujets0.html                     # Subject 0 examples
│   ├── test-cdn.html                    # jsDelivr CDN test page
│   └── test-github-cdn.html             # GitHub Raw CDN test page
├── serve.py                             # Python development server
├── src
│   ├── css
│   │   ├── daisyui-svg-theming.css      # DaisyUI SVG theming CSS file
│   │   ├── global.css                   # Global CSS file
│   │   └── root.css                     # Root CSS file
│   ├── diagraphe.js                     # Main Diagraphe JavaScript library
│   └── elements.js                      # Element classes (Rectangle, etc.)
└── todos.md                             # Project TODOs
```



## DaisyUI Theme Variables









