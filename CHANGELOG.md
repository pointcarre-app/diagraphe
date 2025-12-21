# Changelog

All notable changes to **Diagraphe** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/SemVer).


## [v0.0.5] - 2025-12-21

### 🎨 **Cartesian Coordinate System**
- **Dashed array for parametric curves** (and hence functions)



## [v0.0.4] - 2025-12-16

### 🎨 **Demo Size Adjustments**

#### **Changed**
- **Spé sujet 1 Q8** (`scenery/_sujets0_katex_demos.js`): Reduced graph dimensions
  - Changed size from 550/1.5 × 350/1.5 to 550/1.7 × 350/1.7
  - Adjusted all `foreign_object` label positions for new dimensions

---

## [v0.0.3] - 2025-12-16

### 🎨 **Demo Refinements**

#### **Changed**
- **KaTeX Demo Configurations** (`scenery/_sujets0_katex_demos.js`): Updated all demo configurations
  - Set all margins to 0 for edge-to-edge rendering
  - Adjusted all `foreign_object` positions for Safari compatibility
  - Refined label placements for better visual alignment
  - Added origin label ($0$) to Spé sujet 1 Q11

#### **Fixed**
- **Safari Compatibility**: Positioned all foreign objects within visible bounds (avoiding negative y-coordinates where possible)

---

## [v0.0.2] - 2025-12-16

### 🌐 **CDN Testing & Distribution**

#### **Added**
- **esm.sh CDN Test Page** (`scenery/test-esm-sh.html`): New test page demonstrating hybrid CDN approach
  - ES modules loaded via esm.sh (`esm.sh/gh/pointcarre-app/diagraphe@v0.0.2/`)
  - Static assets (CSS, non-module JS) via jsDelivr (esm.sh COEP headers block static files)
  - Documents esm.sh limitations for serving static assets
- **Scenery Index Update**: Added link to esm.sh CDN test page in `scenery/index.html`

#### **Documentation**
- Clarified CDN usage patterns: esm.sh is optimized for ES modules, jsDelivr for static assets

---

## [v0.0.1] - 2025-12-16

### 🎉 **Initial Release**

**Diagraphe** is a modern, modular SVG graphing library built with ES6 modules, designed for creating mathematical visualizations and interactive diagrams. This release establishes the foundation with comprehensive graphing capabilities, theme support, and extensibility.

### ✨ **Core Features**

#### **📐 Graphing Engine**
- **Modular Architecture**: ES6 module-based design with clean separation of concerns
- **SVG Rendering**: Pure SVG output with viewBox support for responsive scaling
- **Element System**: Extensible element framework supporting multiple graph types
- **Configuration-Driven**: JSON-based configuration for easy graph creation

#### **🎨 Theming & Styling**
- **DaisyUI Integration**: Full support for DaisyUI component library and themes
- **CSS Variables**: Comprehensive theme system with CSS custom properties
- **Semantic Colors**: Support for primary, secondary, accent, neutral, success, warning, error, info colors
- **Font Support**: Open Dyslexic Regular and Google Fonts integration
- **TailwindCSS**: Browser-based TailwindCSS for styling without build tools

#### **🧮 Mathematical Elements**

##### **Basic Shapes**
- **Rectangles**: Positioned rectangles with configurable dimensions
- **Circles**: Circles with center coordinates and radius
- **Ellipses**: Ellipses with configurable radii
- **Lines**: Straight lines with start/end coordinates
- **Polylines**: Multi-segment lines with coordinate arrays
- **Polygons**: Closed shapes with coordinate arrays
- **Paths**: Custom SVG paths with full path syntax support

##### **Coordinate Systems**
- **Axes**: Cartesian coordinate system with customizable ticks and labels
- **Grid**: Optional grid lines for precise measurements
- **Tick Labels**: Automatic or custom tick labeling
- **Axis Labels**: Configurable x/y axis labels

##### **Mathematical Functions**
- **Function Plotting**: Mathematical function visualization with domain control
- **Parametric Curves**: Curves defined by parametric equations
- **Cartesian Points**: Individual points with labels and styling

##### **Advanced Elements**
- **Heatmaps**: Data visualization with color-coded cells
- **Tree Diagrams**: Hierarchical tree structures with branches and labels
- **Probability Trees**: Specialized tree diagrams for probability calculations
- **Foreign Objects**: Embedded HTML content within SVG (including LaTeX math)

### 📚 **KaTeX Mathematical Notation** ✨

#### **Complete LaTeX Support**
- **Inline Math**: `$...$` delimiters for inline mathematical expressions
- **Display Math**: `$$...$$` delimiters for block mathematical expressions
- **Full Font Set**: Complete KaTeX font collection (72 font files) for offline use
- **Unicode Support**: Comprehensive mathematical symbol coverage

#### **Mathematical Labels**
- **Axis Labels**: $x$, $y$ coordinate system labels
- **Origin Labels**: $0$ for coordinate system origins
- **Tick Labels**: $10$ and other numerical labels
- **Point Labels**: $A$, $B$, $R$, $S$ for coordinate points
- **Special Symbols**: $\mathcal{D}$, $\mathcal{P}$ for domain and other notations

### 🌐 **Development & Deployment**

#### **Local Development**
- **Python Server**: CORS-enabled development server with port reuse
- **Hot Reload**: Automatic server restart capability
- **Cross-Origin Support**: Full CORS headers for web development

#### **Build & Distribution**
- **Zero Dependencies**: No build tools required - pure ES6 modules
- **CDN Ready**: Compatible with jsDelivr, ESM, and other CDNs
- **GitHub Pages**: Static hosting support with .nojekyll

### 📁 **Project Structure**

```
├── dependencies/           # External dependencies
│   ├── fonts/             # KaTeX mathematical fonts (72 files)
│   ├── daisyui@5.css      # DaisyUI component library
│   ├── daisyui@5themes.css # DaisyUI theme collection
│   ├── google_fonts.css   # Google Fonts integration
│   ├── katex.css          # KaTeX mathematical typesetting
│   ├── katex.js           # KaTeX rendering engine
│   ├── katex-autorender.js # Automatic math rendering
│   ├── open_dyslexic_regular.css # Dyslexia-friendly font
│   └── tailwindcssbrowser@4.js # Browser-based TailwindCSS
├── experiments/           # Experimental features and demos
│   └── viewbox-explained.html # ViewBox tutorial and examples
├── scenery/               # Demo pages and examples
│   ├── _baseline.html     # Basic element demonstrations
│   ├── _baseline_diagraphe_demos.js # Baseline demo configurations
│   ├── _cartesian.html    # Cartesian coordinate systems
│   ├── _curves2.html      # Curve plotting examples
│   ├── _dynamic.html      # Interactive editing interface
│   ├── _heatmap.html      # Heatmap visualizations
│   ├── _tree.html         # Tree diagram examples
│   ├── sujets0_katex.html # KaTeX mathematical examples
│   ├── _sujets0_katex_demos.js # KaTeX demo configurations
│   └── index.html         # Main scenery index
├── src/                   # Core library source
│   ├── css/               # Styling and theming
│   │   ├── daisyui-svg-theming.css # SVG-specific DaisyUI theming
│   │   ├── global.css     # Global styles
│   │   └── root.css       # CSS custom properties
│   ├── diagraphe.js       # Main Diagraphe class
│   └── elements/          # Element implementations
│       ├── axes.js        # Coordinate axes
│       ├── basic_shapes.js # Fundamental shapes
│       ├── cartesian_elements.js # Cartesian-specific elements
│       ├── element.js     # Base element class
│       ├── foreign_object.js # HTML embedding
│       ├── heatmap.js     # Heatmap visualization
│       ├── index.js       # Element exports
│       ├── parametric_curve.js # Parametric curves
│       └── tree.js        # Tree structures
├── .gitignore             # Git ignore rules
├── .nojekyll              # GitHub Pages configuration
├── CHANGELOG.md           # This changelog
├── index.html             # Project landing page
├── README.md              # Project documentation
├── serve.py               # Development server
└── todos.md               # Development roadmap
```

### 🎨 **Theme Support**

#### **Built-in DaisyUI Themes**
- **Anchor** (default): Professional blue-gray theme
- **Reinforced Contrast**: High contrast accessibility theme
- **Inversed Contrast**: Dark-on-light theme
- **Purple**: Purple-based color scheme
- **Dark Black**: Pure dark theme
- **Zelie/Zelie Dark**: Custom themed variants
- **Light/Dark Opt**: Optimized light and dark themes
- **And many more...**: Full DaisyUI theme collection

### 🔧 **Configuration Options**

#### **Graph Configuration**
```javascript
{
    width: 300,           // Canvas width
    height: 300,          // Canvas height
    margin: {             // Margins around graph area
        top: 25,
        right: 25,
        bottom: 25,
        left: 25
    },
    svg: {                // SVG-specific options
        classes: ['bg-base-100']
    },
    elements: [...]       // Array of graph elements
}
```

#### **Element Types**
- `rect`: Rectangles
- `circle`: Circles
- `ellipse`: Ellipses
- `line`: Lines
- `polyline`: Multi-segment lines
- `polygon`: Polygons
- `path`: Custom SVG paths
- `axes`: Coordinate systems
- `function`: Mathematical functions
- `cartesian_dot`: Points
- `parametric_curve`: Parametric equations
- `heatmap`: Data heatmaps
- `probability_tree`: Probability trees
- `foreign_object`: Embedded HTML/LaTeX

### 🚀 **Usage Examples**

#### **Basic Graph**
```javascript
import { Diagraphe } from './src/diagraphe.js';

const config = {
    width: 400,
    height: 300,
    elements: [{
        nature: 'axes',
        xMin: -5, xMax: 5,
        yMin: -5, yMax: 5
    }, {
        nature: 'function',
        f: (x) => x * x,
        xMin: -5, xMax: 5
    }]
};

new Diagraphe({
    container: document.querySelector('#graph'),
    ...config
});
```

#### **Mathematical Labels**
```javascript
{
    nature: 'foreign_object',
    x: 150, y: 150,
    centered: true,
    html: '<div data-diagraphe-latex="true">$f(x) = x^2$</div>'
}
```

### 🔗 **Distribution**

- **GitHub**: https://github.com/pointcarre-app/diagraphe
- **GitHub Pages**: https://pointcarre-app.github.io/diagraphe/
- **CDN**: Available via jsDelivr (`https://cdn.jsdelivr.net/npm/diagraphe@0.0.1/`)
- **Local**: `python3 serve.py` for development

### 🤝 **Contributing**

This is the initial release establishing the Diagraphe library foundation. Future releases will focus on:
- Additional element types
- Animation and interaction capabilities
- Performance optimizations
- Extended mathematical function support
- More comprehensive documentation

---

**Released on:** January 16, 2025
**Commit:** [View on GitHub](https://github.com/pointcarre-app/diagraphe/commit/1bc2911)
**Tag:** [v0.0.1](https://github.com/pointcarre-app/diagraphe/releases/tag/v0.0.1)
