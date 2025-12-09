import { Element } from './element.js';

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
          rect.setAttribute("class", this.nanClasses.join(" "))
        } else {
          const intensity = (value - min) / (max - min); // 0 à 1
          if (intensity == 0 ){
            rect.setAttribute("class", this.zeroClasses.join(" "))
          }
          else {
            rect.setAttribute("opacity",intensity)
            rect.setAttribute("class", this.classes.join(" "))


          }
        }


        group.appendChild(rect);
      }
    }
    group.setAttribute("class", this.classes.join(" "))
    group.setAttribute("opacity", this.opacity)
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

