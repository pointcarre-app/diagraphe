import { Axes, CalendarHeatmap, Circle, Function, Heatmap, Line, CartesianDot, ParametricCurve, ProbabilityTree, Rectangle } from './elements/index.js';

export class Diagraphe {
  /**
   * @param {Object} options - Graph configuration
   * @param {string|HTMLElement} options.container - Container element or selector
   * @param {number|string} [options.width=400] - Display width in pixels or "100%" for responsive
   * @param {number|string} [options.height=400] - Display height in pixels or "100%" for responsive
   * @param {boolean} [options.responsive=false] - Make SVG responsive (width: 100%, height: auto)
   * @param {Object} [options.viewBox] - Internal coordinate system (fixed)
   * @param {number} [options.viewBox.minX=0] - viewBox origin X
   * @param {number} [options.viewBox.minY=0] - viewBox origin Y
   * @param {number} [options.viewBox.width] - viewBox width (defaults to display width)
   * @param {number} [options.viewBox.height] - viewBox height (defaults to display height)
   * @param {string} [options.preserveAspectRatio='xMidYMid meet'] - Aspect ratio handling
   * @param {Object} [options.margin] - D3.js style margins
   * @param {number} [options.margin.top=20] - Top margin
   * @param {number} [options.margin.right=20] - Right margin
   * @param {number} [options.margin.bottom=20] - Bottom margin
   * @param {number} [options.margin.left=20] - Left margin
   * @param {Object} [options.svg] - SVG configuration
   * @param {string} [options.svg.classes=[]] - CSS classes for the svg
   * @param {Array} [options.elements=[]] - Array of elements to render
   */
  constructor(options) {
    // Display size (rendered size)
    this.width = options.width ?? 400;
    this.height = options.height ?? 400;

    // Internal coordinate system (viewBox)
    // If viewBox not provided, defaults to matching display size
    // TODO 🧂sel: move away
    const displayWidth = typeof this.width === "number" ? this.width : 400;
    const displayHeight = typeof this.height === "number" ? this.height : 400;

    this.viewBox = {
      minX: options.viewBox?.minX ?? 0,
      minY: options.viewBox?.minY ?? 0,
      width: options.viewBox?.width ?? displayWidth,
      height: options.viewBox?.height ?? displayHeight,
    };

    // Aspect ratio handling
    this.preserveAspectRatio = options.preserveAspectRatio ?? "xMidYMid meet";

    // D3.js style margins
    // TODO 🧂sel: ensure we want 0 as default
    this.margin = {
      top: options.margin?.top ?? 0,
      right: options.margin?.right ?? 0,
      bottom: options.margin?.bottom ?? 0,
      left: options.margin?.left ?? 0,
    };

    // Calculate inner dimensions (chart area)
    this.innerWidth = displayWidth - this.margin.left - this.margin.right;
    this.innerHeight = displayHeight - this.margin.top - this.margin.bottom;


    if (this.innerWidth < 0 || this.innerHeight < 0) {
      throw new Error(`this.innerWidth: ${this.innerWidth} and this.innerHeight: ${this.innerHeight} must be positive`);
    }

    this.container =
      typeof options.container === "string"
        ? document.querySelector(options.container)
        : options.container;
    this.elements = options.elements || [];

    this.responsive = options.responsive ?? false;
    this.svgClasses = options.svg?.classes ?? [];
    // this.gClasses = options.g?.classes ?? [];

    this.render();
  }

  /**
   * Get the viewBox string for SVG attribute
   * @returns {string} viewBox attribute value
   */
  getViewBoxString() {
    return `${this.viewBox.minX} ${this.viewBox.minY} ${this.viewBox.width} ${this.viewBox.height}`;
  }

  /**
   * Get the transform string for the inner chart area
   * @returns {string} transform attribute value
   */
  // TODO: sel ensure it is OK
  getChartAreaTransform() {
    return `translate(${this.margin.left}, ${this.margin.top})`;
  }

  render() {
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // Handle responsive vs fixed sizing
    if (this.responsive) {
      // Responsive: use CSS for fluid sizing
      svg.style.width = "100%";
      svg.style.height = "auto";
    } else {
      // Fixed size: use explicit width/height attributes
      svg.setAttribute("width", this.width);
      svg.setAttribute("height", this.height);
    }

    // Always set viewBox if present (for coordinate system)
    if (this.viewBox) {
      svg.setAttribute("viewBox", this.getViewBoxString());
    }
    svg.setAttribute("preserveAspectRatio", this.preserveAspectRatio);
    svg.setAttribute("class", this.svgClasses.join(" "));

    // Create g element (chart area) : d3 margin pattern
    // DON'T SIZE g !!! it adapts
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", this.getChartAreaTransform());
    // g.setAttribute("class", this.gClasses.join(" "));

    // thinner scope :
    // Create elements
    // elements are appended to g (d3 margin pattern)
    this.elements.forEach((elementConfig) => {
      const nature = elementConfig.nature ?? "rect";
      let element;

      // Inject innerWidth and innerHeight for all elements if not provided
      elementConfig.width = elementConfig.width ?? this.innerWidth;
      elementConfig.height = elementConfig.height ?? this.innerHeight;

      switch (nature) {
        case "rect":
          element = new Rectangle(elementConfig);
          break;
        case "circle":
            element = new Circle(elementConfig);
            break;
        case "line":
          element = new Line(elementConfig);
          break;
        case "heatmap":
          element = new Heatmap(elementConfig);
          break;
        case "calendar-heatmap":
          element = new CalendarHeatmap(elementConfig);
          break;
        case "axes":
          element = new Axes(elementConfig);
          break;
        case "cartesian_dot":
          element = new CartesianDot(elementConfig);
          break;
        case "function":
          element = new Function(elementConfig);
          break;
        case "parametric_curve":
          element = new ParametricCurve(elementConfig);
          break;
        case "probability_tree":
          element = new ProbabilityTree(elementConfig);
          break;
        default:
          throw new Error(`Unknown element nature: ${nature}`);
      }

      const svgElement = element.render();
      g.appendChild(svgElement);
    });

    // intermediary scope : g is appended to svg (d3 margin pattern)
    svg.appendChild(g);

    // larger scope : svg is appended to container
    this.container.appendChild(svg);
  }
}




//  * @param {Object} [options.g] - g configuration
//  * @param {string} [options.g.classes=[]] - CSS classes for the g


// @param {Object} [options.domain] - Coordinate bounds (NOT IMPLEMENTED)
// @param {number} [options.domain.xMin=-5] - Minimum X value (NOT IMPLEMENTED)
// @param {number} [options.domain.xMax=5] - Maximum X value (NOT IMPLEMENTED)
// @param {number} [options.domain.yMin=-5] - Minimum Y value (NOT IMPLEMENTED)
// @param {number} [options.domain.yMax=5] - Maximum Y value (NOT IMPLEMENTED)
// @param {Object} [options.features] - Feature flags (NOT IMPLEMENTED)
// @param {boolean} [options.features.axes=true] - Show axes (NOT IMPLEMENTED)
// @param {boolean} [options.features.grid=false] - Show grid (NOT IMPLEMENTED)

// If need g backgound
// Meta solution would be to use a rectangle
// // Optional: Add background rectangle to show chart area bounds
// const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
// background.setAttribute('x', 0);
// background.setAttribute('y', 0);
// background.setAttribute('width', this.innerWidth);
// background.setAttribute('height', this.innerHeight);
// background.setAttribute('fill', 'none');
// background.setAttribute('stroke', '#ddd');
// background.setAttribute('class', 'chart-area-background');
// g.appendChild(background);
