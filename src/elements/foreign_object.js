import { Element } from "./element.js";

/**
 * ForeignObject element for embedding HTML content within SVG
 * Useful for rich text, forms, or any HTML content inside the graph
 *
 * Centering Strategy:
 * When centered=true, the foreignObject uses a 1x1 "anchor point" approach:
 * - The foreignObject is placed at (x, y) with minimal 1x1 dimensions
 * - overflow: visible allows content to spill out in all directions
 * - CSS transform: translate(-50%, -50%) centers the content around the anchor
 * This means you don't need to know the content dimensions ahead of time.
 */
export class ForeignObject extends Element {
  /**
   * @param {Object} options - ForeignObject configuration
   * @param {Array<string>} [options.classes] - CSS classes for the foreignObject
   * @param {number} [options.x=0] - X position (top-left corner, or center if centered=true)
   * @param {number} [options.y=0] - Y position (top-left corner, or center if centered=true)
   * @param {number} [options.foWidth=1] - Width of the foreignObject (ignored when centered=true)
   * @param {number} [options.foHeight=1] - Height of the foreignObject (ignored when centered=true)
   * @param {boolean} [options.centered=false] - If true, uses overflow strategy to center content at (x, y)
   * @param {string} [options.html=''] - HTML content to embed
   * @param {Array<string>} [options.contentClasses] - CSS classes for the inner div wrapper
   */
  constructor(options) {
    super(options);

    this.centered = options.centered ?? false;
    this.html = options.html ?? "";
    this.contentClasses = options.contentClasses ?? [];

    // Store the user-provided coordinates
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;

    // When centered, we use a 1x1 anchor point with overflow visible
    // When not centered, we use the provided dimensions
    if (this.centered) {
      this.foWidth = 1;
      this.foHeight = 1;
    } else {
      this.foWidth = options.foWidth ?? 1;
      this.foHeight = options.foHeight ?? 1;
    }
  }

  renderShape() {
    const foreignObject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    );
    foreignObject.setAttribute("x", this.x);
    foreignObject.setAttribute("y", this.y);
    foreignObject.setAttribute("width", this.foWidth);
    foreignObject.setAttribute("height", this.foHeight);
    foreignObject.setAttribute("opacity", this.opacity);

    // When centered, allow content to overflow the 1x1 anchor
    if (this.centered) {
      foreignObject.setAttribute("style", "overflow: visible;");
    }

    if (this.classes && this.classes.length > 0) {
      foreignObject.setAttribute("class", this.classes.join(" "));
    }

    // Create a div wrapper for the HTML content
    // Using XHTML namespace for proper SVG foreignObject compatibility
    const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");

    if (this.contentClasses && this.contentClasses.length > 0) {
      div.setAttribute("class", this.contentClasses.join(" "));
    }

    // When centered, apply transform to center content around the anchor point
    if (this.centered) {
      div.setAttribute(
        "style",
        "display: inline-block; transform: translate(-50%, -50%); overflow: visible;"
      );
    }

    // Set the HTML content
    div.innerHTML = this.html;

    foreignObject.appendChild(div);

    this.renderMath(div);

    return foreignObject;
  }

  renderMath(foreignObject) {
    const mathElements = foreignObject.querySelectorAll(
      '[data-diagraphe-latex="true"]'
    );

    mathElements.forEach((element) => {
      renderMathInElement(element, {
        // Only render $$ (display) and $ (inline) delimiters
        delimiters: [
          {
            left: "$$",
            right: "$$",
            display: true,
          }, // Display math: $$
          {
            left: "$",
            right: "$",
            display: false,
          }, // Inline math: $
        ],

        // Safe and common options
        throwOnError: false, // Don't throw errors, show them instead
        errorColor: "#cc0000", // Red color for math errors
        trust: false, // Don't trust user input (safer)
        strict: "ignore", // Ignore strict mode violations
        maxSize: Infinity, // Allow unlimited size
        maxExpand: 1000, // Max expansion depth
        colorIsTextColor: false, // Don't treat colors as text colors

        // Custom error handling
        errorCallback: function (msg, err) {
          console.warn("KaTeX error:", msg, err);
        },
      });
    });
  }

  /**
   * Calculate the position for the optional label element.
   *
   * When centered=true, the label is positioned relative to the anchor point:
   *
   *        Label ← (x + offset, y - offset)
   *          ●  ← anchor point at (x, y)
   *     [  content  ]  ← content centered around anchor via CSS transform
   *
   * When centered=false, positioned at top-right corner:
   *
   *        Label ← (x + foWidth + offset, y - offset)
   *     ┌─────────────┐
   *     │ ForeignObj  │
   *     └─────────────┘
   *   (x, y)
   *
   * @returns {{x: number, y: number}} The SVG coordinates for the label position
   */
  calculateLabelPosition() {
    if (this.centered) {
      // When centered, position label relative to the anchor point
      return {
        x: this.x + this.labelOffset,
        y: this.y - this.labelOffset,
      };
    }
    return {
      x: this.x + this.foWidth + this.labelOffset,
      y: this.y - this.labelOffset,
    };
  }
}
