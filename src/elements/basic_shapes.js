import { Element } from './element.js';

export class Rectangle extends Element {
  constructor(options) {
    super(options);

    if (options.width === undefined || options.height === undefined) {
      throw new Error(`Rectangle requires both width and height properties.`);
    }

    this.width = options.width;
    this.height = options.height;
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
  }

  render() {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", this.x);
    rect.setAttribute("y", this.y);
    rect.setAttribute("width", this.width);
    rect.setAttribute("height", this.height);
    rect.setAttribute("opacity", this.opacity)
    rect.setAttribute("class", Array.isArray(this.classes) ? this.classes.join(" ") : classes);
    return rect;
  }
}

export class Circle extends Element {
  /**
   * @param {Object} options - Rectangle configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   * @param {number} options.radius - Element radius
   * @param {number} [options.x=0] - Element x position (center)
   * @param {number} [options.y=0] - Element y position (center)
   */
  constructor(options) {
    super(options);

    if (options.radius === undefined ) {
      throw new Error(`Circle requires radius property.`);
    }
    this.radius = options.radius;
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
  }

  render() {
    console.log("radius", this.radius)
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", this.x);
    circle.setAttribute("cy", this.y);
    circle.setAttribute("r", this.radius);
    circle.setAttribute("opacity", this.opacity)
    circle.setAttribute("class", Array.isArray(this.classes) ? this.classes.join(" ") : classes);
    return circle;
  }
}



export class Line extends Element {
  /**
   * @param {Object} options - Line configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   * @param {number} options.x1 - Start X coordinate
   * @param {number} options.y1 - Start Y coordinate
   * @param {number} options.x2 - End X coordinate
   * @param {number} options.y2 - End Y coordinate
   * @param {number} [options.strokeWidth=1] - Line stroke width
   * @param {string} [options.label] - Optional label text
   * @param {Array<string>} [options.labelClasses] - CSS classes for label
   * @param {number} [options.labelFontSize=12] - Font size for label
   * @param {number} [options.labelOffset=10] - Distance from line to label
   * @param {string} [options.labelPosition="middle"] - Label position: "middle", "start", "end"
   * @param {string} [options.labelAnchor="middle"] - Text anchor: "start", "middle", "end"
   */
  constructor(options) {
    super(options);

    if (options.x1 === undefined || options.y1 === undefined || 
        options.x2 === undefined || options.y2 === undefined) {
      throw new Error(`Line requires x1, y1, x2, and y2 properties.`);
    }

    this.x1 = options.x1;
    this.y1 = options.y1;
    this.x2 = options.x2;
    this.y2 = options.y2;
    this.strokeWidth = options.strokeWidth ?? 1;
    
    // Label configuration
    this.label = options.label ?? null;
    this.labelClasses = options.labelClasses ?? ["fill-base-content"];
    this.labelFontSize = options.labelFontSize ?? 12;
    this.labelOffset = options.labelOffset ?? 10;
    this.labelPosition = options.labelPosition ?? "middle";
    this.labelAnchor = options.labelAnchor ?? "middle";
  }

  render() {
    // Créer un groupe pour contenir la ligne et le label
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Créer la ligne
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", this.x1);
    line.setAttribute("y1", this.y1);
    line.setAttribute("x2", this.x2);
    line.setAttribute("y2", this.y2);
    line.setAttribute("stroke-width", this.strokeWidth);
    line.setAttribute("class", this.classes.join(" "));
    line.setAttribute("opacity", this.opacity)
    
    group.appendChild(line);

    // Ajouter le label si fourni
    if (this.label) {
      const text = this.createLabel();
      group.appendChild(text);
    }

    return group;
  }

  /**
   * Create label element
   * @returns {SVGTextElement}
   */
  createLabel() {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    
    // Calculer la position du label
    const { x, y } = this.calculateLabelPosition();
    
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("class", this.labelClasses.join(" "));
    text.setAttribute("font-size", this.labelFontSize);
    text.setAttribute("text-anchor", this.labelAnchor);
    text.textContent = this.label;
    
    return text;
  }

  /**
   * Calculate label position based on line and configuration
   * @returns {{x: number, y: number}}
   */
  calculateLabelPosition() {
    let x, y;

    // Déterminer la position le long de la ligne
    switch (this.labelPosition) {
      case "start":
        x = this.x1;
        y = this.y1;
        break;
      case "end":
        x = this.x2;
        y = this.y2;
        break;
      case "middle":
      default:
        x = (this.x1 + this.x2) / 2;
        y = (this.y1 + this.y2) / 2;
        break;
    }

    // Calculer le vecteur perpendiculaire pour positionner au-dessus
    const dx = this.x2 - this.x1;
    const dy = this.y2 - this.y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length > 0) {
      // Vecteur perpendiculaire normalisé (rotation de 90° vers le haut)
      const perpX = -dy / length;
      const perpY = dx / length;
      
      // Déplacer le label au-dessus de la ligne
      x += perpX * this.labelOffset;
      y += perpY * this.labelOffset;
    }

    return { x, y };
  }
}