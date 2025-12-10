import { CartesianElement } from "./element.js";
export class CartesianDot extends CartesianElement {
  /**
   * @param {Object} options - Rectangle configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   * @param {number} - Element x position (center)
   * @param {number} - Element y position (center)
   * @param {number} options.radius - Element radius
   */
  constructor(options) {
    super(options);

    this.x = this.mathToSvgX(options.x) ;
    this.y = this.mathToSvgY(options.y) ;
    this.radius = options.radius ?? 5;
  }

  calculateLabelPosition() {
    let x, y;
    x = this.x + this.radius + this.labelOffset;
    y = this.y + this.radius - this.labelOffset;
    return { x, y };
  }

  renderShape() {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", this.x);
    circle.setAttribute("cy", this.y);
    circle.setAttribute("r", this.radius);
    circle.setAttribute("opacity", this.opacity)
    circle.setAttribute("class", Array.isArray(this.classes) ? this.classes.join(" ") : classes);
    return circle;
  }


}
