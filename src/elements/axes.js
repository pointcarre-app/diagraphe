import { CartesianElement } from './element.js';

export class Axes extends CartesianElement {
  /**
   * ... params of maths elements
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


  constructor(options) {
    super(options);


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
    this.arrowSize = options.arrowSize ?? 6; // Taille de la flèche
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
    group.setAttribute("class", this.classes.join(" "));
    group.setAttribute("opacity", this.opacity)

    if (this.grid) {
      this.renderGrid(group);
    }

    // TODO finir de refactor cette partie

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
