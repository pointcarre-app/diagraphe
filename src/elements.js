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
  }

  render() {
    throw new Error("Element is an abstract base class and cannot be instantiated directly. Use a concrete subclass like Rectangle.");
  }
}

export class Rectangle extends Element {
  /**
   * @param {Object} options - Rectangle configuration
   * @param {Array<string>} options.classes - CSS classes for the element
   * @param {number} options.width - Element width
   * @param {number} options.height - Element height
   * @param {number} [options.x=0] - Element x position
   * @param {number} [options.y=0] - Element y position
   */
  constructor(options) {
    super(options);

    if (options.width === undefined || options.height === undefined) {
      throw new Error(`Rectangle requires both width and height properties. Received: width=${options.width}, height=${options.height}`);
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
    // Join classes array with spaces
    rect.setAttribute("class", this.classes.join(" "));

    return rect;
  }
}