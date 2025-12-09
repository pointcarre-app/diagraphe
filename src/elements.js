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

    // Join classes array with spaces
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
    this.applyClassesAndOpacity(rect)
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
    this.applyClassesAndOpacity(circle)
    return circle;
  }
}



export class Heatmap extends Element {
  /**
   * @param {Object} options - Heatmap configuration
   * @param {Array<string>} options.classes - CSS classes for the group
   * @param {number} options.width - SVG width
   * @param {number} options.height - SVG height
   * @param {Array<Array<number>>} options.data - 2D array of values
   */
  constructor(options) {
    super(options);

    this.data = options.data; // Ex: [[1,2,3], [4,5,6], [7,8,9]]

    // NOTE: Width and height are actually maximal values here when passed as options
    this.width = options.width;
    this.height = options.height;
    this.offset = options.offset ?? 2
    this.radius = options.radius ?? 2

    // Couleurs configurables
    this.zeroClasses = options.zeroClasses ;
    this.nanClasses = options.nanClasses;

    const rows = this.data.length;
    const cols = this.data[0].length;

    this.cellSize = Math.min(
      (options.width - (cols - 1) * this.offset) / cols,
      (options.height - (rows - 1) * this.offset) / rows,
    )
  }

  render() {
    const rows = this.data.length;
    const cols = this.data[0].length;
    const cellWidth = this.cellSize;
    const cellHeight = this.cellSize;

    // Calculer la taille totale réelle de la heatmap
    const totalWidth = cols * cellWidth + (cols - 1) * this.offset;
    const totalHeight = rows * cellHeight + (rows - 1) * this.offset;

    // Calculer l'offset pour centrer
    const offsetX = (this.width - totalWidth) / 2;
    const offsetY = (this.height - totalHeight) / 2;

    // Trouver min/max pour normaliser les couleurs
    // const flat = this.data.flat();
    const flat = this.data.flat().filter(v => !isNaN(v) && v !== null);
    const min = Math.min(...flat);
    const max = Math.max(...flat);

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    // Appliquer le transform pour centrer
    group.setAttribute("transform", `translate(${offsetX}, ${offsetY})`);

    // Créer les cellules
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        const x = j  * cellWidth + j * this.offset 
        const y = i  * cellWidth + i * this.offset 


        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("rx", this.radius);
        rect.setAttribute("ry", this.radius);
        rect.setAttribute("width", cellWidth);
        rect.setAttribute("height", cellHeight);

        const value = this.data[i][j];
        if (isNaN(value) || value === null) {
          this.applyClassesAndOpacity(rect, { classes: this.nanClasses }); // Couleur pour NaN
        } else {
          const intensity = (value - min) / (max - min); // 0 à 1
          if (intensity == 0 ){
            this.applyClassesAndOpacity(rect, { classes: this.zeroClasses})
          }
          else {
            this.applyClassesAndOpacity(rect, { opacity: intensity })
          }
        }


        group.appendChild(rect);
      }
    }
    this.applyClassesAndOpacity(group)
    return group;
  }
}


// Ajouter sur les examples précédents
// représenter des semaines
// représenter décembre, puis représenter le 1er du mois
// + de violet que de gris



export class Axes extends Element {
  /**
   * @param {Object} options - Axes configuration
   * @param {Array<string>} options.classes - CSS classes for the group
   * @param {number} options.width - SVG width
   * @param {number} options.height - SVG height
   * @param {number} [options.strokeWidth=2] - Axes stroke width
   */

  // TODO: use markers for ticks and arrows
  

  constructor(options) {
    super(options);
    this.width = options.width;
    this.height = options.height;
    this.strokeWidth = options.strokeWidth ?? 1;
    this.xMin = options.xMin ?? -1;
    this.xMax = options.xMax ?? 10;
    this.yMin = options.yMin ?? -1;
    this.yMax = options.yMax ?? 10;
  }

  render() {
    // const centerX = this.width / 2;
    // const centerY = this.height / 2;
    // Position SVG des axes (où x=0 et y=0 en coordonnées mathématiques)
    const axisYPosition = this.mathToSvgX(0);  // Position de l'axe Y (vertical)
    const axisXPosition = this.mathToSvgY(0);  // Position de l'axe X (horizontal)

    // Créer le groupe
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", this.classes.join(" "));

    // Axe X
    const axisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axisX.setAttribute("x1", 0);
    axisX.setAttribute("y1", centerY);
    axisX.setAttribute("x2", this.width);
    axisX.setAttribute("y2", centerY);
    axisX.setAttribute("stroke", "black");
    axisX.setAttribute("stroke-width", this.strokeWidth);

    // Axe Y
    const axisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axisY.setAttribute("x1", centerX);
    axisY.setAttribute("y1", 0);
    axisY.setAttribute("x2", centerX);
    axisY.setAttribute("y2", this.height);
    axisY.setAttribute("stroke", "black");
    axisY.setAttribute("stroke-width", this.strokeWidth);

    // Ajouter les axes au groupe
    group.appendChild(axisX);
    group.appendChild(axisY);

    return group;
  }
}