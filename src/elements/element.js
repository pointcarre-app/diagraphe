export class Element {
  /**
   * @param {Object} options - Element configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   */
  constructor(options) {
    // Handle classes as either string or array
    this.classes = Array.isArray(options.classes)
      ? options.classes
      : [options.classes];
    this.opacity = options.opacity ?? 100
  }

  /**
   * Convert mathematical x coordinate to SVG x coordinate
   * @param {number} x - Mathematical x coordinate
   * @returns {number} SVG x coordinate
   */
  mathToSvgX(x) {
    return ((x - this.xMin) / (this.xMax - this.xMin)) * this.width;
  }


  /**
   * Convert mathematical y coordinate to SVG y coordinate
   * Note: SVG y-axis is inverted (grows downward)
   * @param {number} y - Mathematical y coordinate
   * @returns {number} SVG y coordinate
   */
  mathToSvgY(y) {
    return this.height - ((y - this.yMin) / (this.yMax - this.yMin)) * this.height;
  }


  applyClassesAndOpacity(element, overrides = {}) {
    // TODO: get rid of this function
    // Utiliser les classes fournies en override, sinon les classes par défaut
    const classes = overrides.classes ?? this.classes;
    element.setAttribute("class", Array.isArray(classes) ? classes.join(" ") : classes);
    
    // Utiliser l'opacité fournie en override, sinon l'opacité par défaut
    const opacity = overrides.opacity ?? this.opacity;
    if (opacity !== undefined) {
      element.setAttribute("opacity", opacity);
    }
  }


  render() {
    throw new Error("Element is an abstract base class and cannot be instantiated directly. Use a concrete subclass like Rectangle.");
  }
}
