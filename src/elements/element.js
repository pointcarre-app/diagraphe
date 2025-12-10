export class Element {
  /**
   * @param {Object} options - Element configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   * @param {string} options.opacity
   * @param {string} options.label
   * @param {Array<string>} [options.labelClasses] - CSS classes for label
   * @param {number} [options.labelFontSize=12] - Font size for label
   * @param {number} [options.labelOffset=10] - Distance from line to label
   * @param {string} [options.labelPosition="middle"] - Label position: "middle", "start", "end"
   * @param {string} [options.labelAnchor="middle"] - Text anchor: "start", "middle", "end"

  */
  constructor(options) {
    // Handle classes as either string or array
    this.classes = Array.isArray(options.classes)
      ? options.classes
      : [options.classes];
    this.opacity = options.opacity ?? 100
    
    // Label configuration
    this.label = options.label ?? null
    this.labelClasses = options.labelClasses ?? ["fill-base-content"];
    this.labelFontSize = options.labelFontSize ?? 12;
    this.labelOffset = options.labelOffset ?? 10;
    this.labelPosition = options.labelPosition ?? "middle";
    this.labelAnchor = options.labelAnchor ?? "middle";
  } 

  render() {
    throw new Error("Element is an abstract base class and cannot be instantiated directly. Use a concrete subclass like Rectangle.");
  }
}


/**
 * Base class for elements using mathematical coordinate systems
 * Handles conversion between mathematical coordinates and SVG coordinates
 * 
 * IMPORTANT: width/height should be the drawable area (innerWidth/innerHeight),
 * not the total SVG dimensions. Diagraphe handles this automatically.
 */
export class MathElement extends Element {
  /**
   * @param {Object} options
   * @param {number} options.width - Drawable width (typically innerWidth from Diagraphe)
   * @param {number} options.height - Drawable height (typically innerHeight from Diagraphe)
   * @param {number} [options.xMin=-10] - Minimum X in math coordinates
   * @param {number} [options.xMax=10] - Maximum X in math coordinates
   * @param {number} [options.yMin=-10] - Minimum Y in math coordinates
   * @param {number} [options.yMax=10] - Maximum Y in math coordinates
   */
  constructor(options) {
    super(options);

    // Drawable area dimensions (required for conversion)
    if (options.width === undefined || options.height === undefined) {
      throw new Error('MathElement requires width and height for coordinate conversion');
    }
    this.width = options.width;
    this.height = options.height;

    // Mathematical coordinate system
    this.xMin = options.xMin ?? -10;
    this.xMax = options.xMax ?? 10;
    this.yMin = options.yMin ?? -10;
    this.yMax = options.yMax ?? 10;
  }

  /**
   * Convert mathematical X coordinate to SVG X coordinate
   * @param {number} x - Mathematical X coordinate
   * @returns {number} SVG X coordinate
   */
  mathToSvgX(x) {
    return ((x - this.xMin) / (this.xMax - this.xMin)) * this.width;
  }

  /**
   * Convert mathematical Y coordinate to SVG Y coordinate
   * Note: SVG Y-axis is inverted (grows downward)
   * @param {number} y - Mathematical Y coordinate
   * @returns {number} SVG Y coordinate
   */
  mathToSvgY(y) {
    return this.height - ((y - this.yMin) / (this.yMax - this.yMin)) * this.height;
  }



  render() {
    throw new Error('MathElement is an abstract class and must be extended');
  }
}