import { CartesianElement } from './element.js';

export class ParametricCurve extends CartesianElement {
  /**
   * @param {Object} options - Parametric curve configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   * @param {number} options.width - SVG width (for math coordinates conversion)
   * @param {number} options.height - SVG height (for math coordinates conversion)
   * @param {number} options.xMin - Minimum X value in math coordinates
   * @param {number} options.xMax - Maximum X value in math coordinates
   * @param {number} options.yMin - Minimum Y value in math coordinates
   * @param {number} options.yMax - Maximum Y value in math coordinates
   * @param {Function} options.x - Function x(t) returning X coordinate
   * @param {Function} options.y - Function y(t) returning Y coordinate
   * @param {number} options.tMin - Minimum parameter value
   * @param {number} options.tMax - Maximum parameter value
   * @param {number} [options.tStep=0.01] - Step size for parameter t
   * @param {number} [options.strokeWidth=2] - Curve stroke width
   * @param {string} [options.fill="none"] - Fill color (usually "none" for curves)
   */
  constructor(options) {
    super(options);

    // Fonctions paramétrées
    if (!options.x || !options.y) {
      throw new Error('ParametricCurve requires x(t) and y(t) functions.');
    }
    this.xFunc = options.x;
    this.yFunc = options.y;

    // Paramètre t
    if (options.tMin === undefined || options.tMax === undefined) {
      throw new Error('ParametricCurve requires tMin and tMax.');
    }
    this.tMin = options.tMin;
    this.tMax = options.tMax;
    this.tStep = options.tStep ?? 0.01;

    // Style
    this.strokeWidth = options.strokeWidth ?? 2;
    this.fill = options.fill ?? "none";
  }

  renderShape() {
    // Générer les points de la courbe
    const points = this.generatePoints();

    // Créer le path SVG
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    
    // Construire la commande de path
    const pathData = this.buildPathData(points);
    path.setAttribute("d", pathData);
    path.setAttribute("stroke-width", this.strokeWidth);
    path.setAttribute("fill", this.fill);
    
    path.setAttribute("opacity", this.opacity);
    path.setAttribute("class", this.classes.join(" "));


    return path;
  }

  /**
   * Generate curve points by evaluating x(t) and y(t)
   * @returns {Array<{x: number, y: number}>} Array of SVG coordinates
   */
  generatePoints() {
    const points = [];

    for (let t = this.tMin; t <= this.tMax; t += this.tStep) {
      // Évaluer les fonctions paramétrées
      const xMath = this.xFunc(t);
      const yMath = this.yFunc(t);

      // Vérifier que les points sont valides
      if (isNaN(xMath) || isNaN(yMath) || 
          !isFinite(xMath) || !isFinite(yMath)) {
        continue; // Skip invalid points
      }

      // Convertir en coordonnées SVG
      const xSvg = this.mathToSvgX(xMath);
      const ySvg = this.mathToSvgY(yMath);

      points.push({ x: xSvg, y: ySvg });
    }

    return points;
  }

  /**
   * Build SVG path data string from points
   * @param {Array<{x: number, y: number}>} points
   * @returns {string} SVG path data
   */
  buildPathData(points) {
    if (points.length === 0) {
      return "";
    }

    let pathData = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x} ${points[i].y}`;
    }

    return pathData;
  }
}

/**
 * Function curve: y = f(x)
 * Simplified wrapper around ParametricCurve for the common case of y = f(x)
 */
export class Function extends ParametricCurve {
  /**
   * @param {Object} options - Function configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   * @param {number} options.width - SVG width (for math coordinates conversion)
   * @param {number} options.height - SVG height (for math coordinates conversion)
   * @param {number} options.xMin - Minimum X value in math coordinates
   * @param {number} options.xMax - Maximum X value in math coordinates
   * @param {number} options.yMin - Minimum Y value in math coordinates
   * @param {number} options.yMax - Maximum Y value in math coordinates
   * @param {Function} options.f - Function f(x) returning Y coordinate
   * @param {number} [options.xStep=0.01] - Step size for x (replaces tStep)
   * @param {number} [options.strokeWidth=2] - Curve stroke width
   * @param {string} [options.fill="none"] - Fill color (usually "none" for curves)
   */
  constructor(options) {
    // Validate that f(x) is provided
    if (!options.f) {
      throw new Error('Function requires f(x) function.');
    }

    // Convert f(x) to parametric form: x(t) = t, y(t) = f(t)
    const parametricOptions = {
      ...options,
      x: (t) => t,           // x = t
      y: (t) => options.f(t), // y = f(t)
      tMin:  options.tMin ?? options.xMin,     // t starts at xMin
      tMax:  options.tMax ?? options.xMax,     // t ends at xMax
      tStep: options.xStep ?? 0.01
    };

    // Call parent constructor with parametric form
    super(parametricOptions);

    // Store original function for reference
    this.f = options.f;
    this.xStep = options.xStep ?? 0.01;
  }

  // No need to override renderShape(), generatePoints(), or buildPathData()
  // They are inherited from ParametricCurve and work perfectly!
}