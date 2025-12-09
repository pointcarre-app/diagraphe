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

export class CalendarHeatmap extends Heatmap {
  /**
   * @param {Object} options - Calendar heatmap configuration
   * @param {number} options.year - Year (e.g., 2024)
   * @param {number} options.month - Month (1-12)
   * @param {Array<number>} options.values - Array of values (one per day)
   * ... autres options héritées de Heatmap
   */
  constructor(options) {
    // Construire la matrice 2D à partir de year, month, values
    const data = CalendarHeatmap.buildCalendarMatrix(
      options.year,
      options.month,
      options.values
    );

    // Appeler le parent avec la data construite
    super({
      ...options,
      data: data
    });

    // Stocker pour référence (optionnel)
    this.year = options.year;
    this.month = options.month;
    this.values = options.values;
  }

    /**
   * Construit une matrice 2D (semaines x 7 jours, Lundi-Dimanche)
   * @param {number} year - Année
   * @param {number} month - Mois (1-12)
   * @param {Array<number>} values - Valeurs pour chaque jour du mois
   * @returns {Array<Array<number>>} Matrice 2D
   */
  static buildCalendarMatrix(year, month, values) {
    // 1. Nombre de jours dans le mois
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // 2. Premier jour du mois (0=Dimanche, 1=Lundi, etc.)
    const firstDay = new Date(year, month - 1, 1).getDay();
    
    // 3. Convertir pour Lundi=0, Dimanche=6
    const firstDayMonday = firstDay === 0 ? 6 : firstDay - 1;
    
    // 4. Nombre de semaines nécessaires
    const totalCells = firstDayMonday + daysInMonth;
    const numWeeks = Math.ceil(totalCells / 7);
    
    // 5. Créer la matrice (semaines x 7 jours)
    const matrix = Array(numWeeks).fill(null).map(() => Array(7).fill(null));
    
    // 6. Remplir avec les valeurs
    let dayIndex = 0;
    for (let week = 0; week < numWeeks; week++) {
      for (let day = 0; day < 7; day++) {
        const cellIndex = week * 7 + day;
        const dayOfMonth = cellIndex - firstDayMonday + 1;
        
        if (dayOfMonth >= 1 && dayOfMonth <= daysInMonth) {
          // Jour valide
          matrix[week][day] = values[dayIndex] ?? 0;
          dayIndex++;
        }
        // else : reste null (cellule vide)
      }
    }
    
    return matrix;
  }
}



export class Axes extends Element {
  /**
   * @param {Object} options - Axes configuration
   * @param {Array<string>} options.classes - CSS classes for the group
   * @param {number} options.width - SVG width
   * @param {number} options.height - SVG height
   * @param {number} [options.strokeWidth=1] - Axes stroke width
   * @param {number} [options.xMin=-1] - Minimum X value
   * @param {number} [options.xMax=10] - Maximum X value
   * @param {number} [options.yMin=-1] - Minimum Y value
   * @param {number} [options.yMax=10] - Maximum Y value
   * @param {number} [options.arrowSize=6] - Arrow size
   * @param {boolean} [options.grid=false] - Show grid
   * @param {Array<string>} [options.gridClasses] - CSS classes for grid lines
   * @param {number} [options.gridOpacity=0.2] - Grid line opacity (0-1)
   * @param {number} [options.gridStrokeWidth=0.5] - Grid line stroke width
   * @param {Array<number>} [options.xTicks] - X axis tick values (e.g., [0, 5, 10])
   * @param {Array<number>} [options.yTicks] - Y axis tick values (e.g., [-5, 0, 5])
   * @param {number} [options.tickSize=5] - Tick mark size
   * @param {Array<string>} [options.tickClasses] - CSS classes for tick marks
   * @param {boolean} [options.showTickLabels=false] - Show labels on ticks
   * @param {Array<string>} [options.tickLabelClasses] - CSS classes for tick labels
   * @param {number} [options.tickLabelOffset=10] - Distance between tick and label
   * @param {number} [options.fontSize=12] - Font size for labels
   * @param {boolean} [options.showAxisLabels=false] - Show axis labels
   * @param {string} [options.xAxisLabel="x"] - Label for X axis
   * @param {string} [options.yAxisLabel="y"] - Label for Y axis
   * @param {Array<string>} [options.axisLabelClasses] - CSS classes for axis labels
   * @param {number} [options.axisLabelFontSize=14] - Font size for axis labels
   * @param {number} [options.axisLabelOffset=15] - Distance from arrow to label
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
    this.arrowSize = options.arrowSize ?? 6; // Taille de la flèche

    // Configuration de la grille
    this.grid = options.grid ?? false;
    this.gridClasses = options.gridClasses ?? ["stroke-base-content"];
    this.gridOpacity = options.gridOpacity ?? 0.2;
    this.gridStrokeWidth = options.gridStrokeWidth ?? 0.5;

    // Configuration des ticks
    this.xTicks = options.xTicks ?? null; // null = pas de ticks
    this.yTicks = options.yTicks ?? null;
    this.tickSize = options.tickSize ?? 5;
    this.tickClasses = options.tickClasses ?? ["stroke-base-content"];

    // Configuration des labels
    this.showTickLabels = options.showTickLabels ?? false;
    this.tickLabelClasses = options.tickLabelClasses ?? ["fill-base-content"];
    this.tickLabelOffset = options.tickLabelOffset ?? 10;
    this.fontSize = options.fontSize ?? 12;

    // Configuration des labels d'axes
    this.showAxisLabels = options.showAxisLabels ?? false;
    this.xAxisLabel = options.xAxisLabel ?? "x";
    this.yAxisLabel = options.yAxisLabel ?? "y";
    this.axisLabelClasses = options.axisLabelClasses ?? ["fill-base-content"];
    this.axisLabelFontSize = options.axisLabelFontSize ?? 14;
    this.axisLabelOffset = options.axisLabelOffset ?? 15;
  }

  render() {
    // Position SVG des axes (où x=0 et y=0 en coordonnées mathématiques)
    const axisYPosition = this.mathToSvgX(0);  // Position de l'axe Y (vertical)
    const axisXPosition = this.mathToSvgY(0);  // Position de l'axe X (horizontal)

    // Créer le groupe
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    // group.setAttribute("class", this.classes.join(" "));
    this.applyClassesAndOpacity(group)

    if (this.grid) {
      console.log("coucou")
      this.renderGrid(group);
    }

    // Créer un élément <defs> pour le marker
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    // Créer le marker (flèche)
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", `arrow-${Math.random().toString(36).substr(2, 9)}`); // ID unique
    marker.setAttribute("markerWidth", this.arrowSize);
    marker.setAttribute("markerHeight", this.arrowSize);
    marker.setAttribute("refX", this.arrowSize - 1);
    marker.setAttribute("refY", this.arrowSize / 2);
    marker.setAttribute("orient", "auto");
    
    // Créer le chemin de la flèche
    const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowPath.setAttribute("d", `M 0 0 L ${this.arrowSize} ${this.arrowSize / 2} L 0 ${this.arrowSize} Z`);
    arrowPath.setAttribute("fill", "black");
    
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    group.appendChild(defs);

    const markerId = marker.getAttribute("id");

    // Axe X
    const axisX = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axisX.setAttribute("x1", 0);
    axisX.setAttribute("x2", this.width);
    axisX.setAttribute("y1", axisXPosition);
    axisX.setAttribute("y2", axisXPosition);
    axisX.setAttribute("stroke", "black");
    axisX.setAttribute("stroke-width", this.strokeWidth);

    // Ajouter la flèche si l'extrémité positive est visible
    axisX.setAttribute("marker-end", `url(#${markerId})`);


    // Axe Y
    const axisY = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axisY.setAttribute("x1", axisYPosition);
    axisY.setAttribute("x2", axisYPosition);
    axisY.setAttribute("y1", this.height);
    axisY.setAttribute("y2", 0);
    axisY.setAttribute("stroke", "black");
    axisY.setAttribute("stroke-width", this.strokeWidth);

    axisY.setAttribute("marker-end", `url(#${markerId})`);

    // Ajouter les axes au groupe
    group.appendChild(axisX);
    group.appendChild(axisY);

    // Ticks APRÈS les axes (pour qu'ils soient au-dessus)
    if (this.xTicks) {
      this.renderXTicks(group, axisXPosition, axisYPosition);
    }
    if (this.yTicks) {
      this.renderYTicks(group, axisYPosition);
    }

    // Labels des axes (à la fin pour être au-dessus)
    if (this.showAxisLabels) {
      this.renderAxisLabels(group, axisXPosition, axisYPosition);
    }

    return group;
  }


    /**
     * Render grid lines
     * @param {SVGElement} group - Parent group element
     */
    renderGrid(group) {
      // Lignes verticales (pour chaque valeur entière de X)
      for (let x = Math.ceil(this.xMin); x <= Math.floor(this.xMax); x++) {
        const svgX = this.mathToSvgX(x);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", svgX);
        line.setAttribute("x2", svgX);
        line.setAttribute("y1", 0);
        line.setAttribute("y2", this.height);
        line.setAttribute("class", this.gridClasses.join(" "));
        line.setAttribute("stroke-width", this.gridStrokeWidth);
        line.setAttribute("opacity", this.gridOpacity);
        group.appendChild(line);
      }

      // Lignes horizontales (pour chaque valeur entière de Y)
      for (let y = Math.ceil(this.yMin); y <= Math.floor(this.yMax); y++) {
        const svgY = this.mathToSvgY(y);
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("x2", this.width);
        line.setAttribute("y1", svgY);
        line.setAttribute("y2", svgY);
        line.setAttribute("class", this.gridClasses.join(" "));
        line.setAttribute("stroke-width", this.gridStrokeWidth);
        line.setAttribute("opacity", this.gridOpacity);
        group.appendChild(line);
      }
    }


  /**
   * Render X axis ticks
   * @param {SVGElement} group - Parent group element
   * @param {number} axisXPosition - Y position of X axis
   * @param {number} axisYPosition - X position of Y axis (for positioning "0" label)
   */
  renderXTicks(group, axisXPosition, axisYPosition) {
    this.xTicks.forEach(tickValue => {
      // Vérifier que le tick est dans la plage visible
      if (tickValue >= this.xMin && tickValue <= this.xMax) {
        const svgX = this.mathToSvgX(tickValue);
        
        // Créer la marque de tick
        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute("x1", svgX);
        tick.setAttribute("x2", svgX);
        tick.setAttribute("y1", axisXPosition - this.tickSize / 2);
        tick.setAttribute("y2", axisXPosition + this.tickSize / 2);
        tick.setAttribute("class", this.tickClasses.join(" "));
        tick.setAttribute("stroke-width", this.strokeWidth);
        
        group.appendChild(tick);

        // Ajouter le label si demandé
        if (this.showTickLabels) {
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", svgX);
          text.setAttribute("class", this.tickLabelClasses.join(" "));
          text.setAttribute("font-size", this.fontSize);
          text.setAttribute("text-anchor", "middle");
          
          // Positionner le label
          if (tickValue === 0) {
            // "0" au coin inférieur gauche du croisement
            text.setAttribute("y", axisXPosition + this.tickLabelOffset + this.fontSize);
            text.setAttribute("x", axisYPosition - this.tickLabelOffset);
            text.setAttribute("text-anchor", "end");
          } else {
            // Autres valeurs en dessous de l'axe X
            text.setAttribute("y", axisXPosition + this.tickLabelOffset + this.fontSize);
          }
          
          text.textContent = tickValue;
          group.appendChild(text);
        }
      }
    });
  }

  /**
   * Render Y axis ticks
   * @param {SVGElement} group - Parent group element
   * @param {number} axisYPosition - X position of Y axis
   */
  renderYTicks(group, axisYPosition) {
    this.yTicks.forEach(tickValue => {
      // Vérifier que le tick est dans la plage visible
      if (tickValue >= this.yMin && tickValue <= this.yMax) {
        const svgY = this.mathToSvgY(tickValue);
        
        // Créer la marque de tick
        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute("x1", axisYPosition - this.tickSize / 2);
        tick.setAttribute("x2", axisYPosition + this.tickSize / 2);
        tick.setAttribute("y1", svgY);
        tick.setAttribute("y2", svgY);
        tick.setAttribute("class", this.tickClasses.join(" "));
        tick.setAttribute("stroke-width", this.strokeWidth);
        
        group.appendChild(tick);

        // Ajouter le label si demandé
        if (this.showTickLabels && tickValue !== 0) { // Skip 0, déjà géré par X
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", axisYPosition - this.tickLabelOffset);
          text.setAttribute("y", svgY + this.fontSize / 3); // Centrage vertical
          text.setAttribute("class", this.tickLabelClasses.join(" "));
          text.setAttribute("font-size", this.fontSize);
          text.setAttribute("text-anchor", "end");
          text.textContent = tickValue;
          group.appendChild(text);
        }
      }
    });
  }


  /**
   * Render axis labels (x and y near the arrows)
   * @param {SVGElement} group - Parent group element
   * @param {number} axisXPosition - Y position of X axis
   * @param {number} axisYPosition - X position of Y axis
   */
  renderAxisLabels(group, axisXPosition, axisYPosition) {
    // Label X (en dessous de la flèche à droite)
    const xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    xLabel.setAttribute("x", this.width);
    xLabel.setAttribute("y", axisXPosition + this.axisLabelOffset + this.axisLabelFontSize);
    xLabel.setAttribute("class", this.axisLabelClasses.join(" "));
    xLabel.setAttribute("font-size", this.axisLabelFontSize);
    xLabel.setAttribute("text-anchor", "end");
    xLabel.textContent = this.xAxisLabel;
    group.appendChild(xLabel);

    // Label Y (à droite de la flèche en haut)
    const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yLabel.setAttribute("x", axisYPosition + this.axisLabelOffset);
    yLabel.setAttribute("y", this.axisLabelFontSize);
    yLabel.setAttribute("class", this.axisLabelClasses.join(" "));
    yLabel.setAttribute("font-size", this.axisLabelFontSize);
    yLabel.setAttribute("text-anchor", "start");
    yLabel.textContent = this.yAxisLabel;
    group.appendChild(yLabel);
  }
}
