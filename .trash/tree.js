
//     // /**
//     //  * Calculate positions for all nodes in the tree
//     //  * @returns {Array} Array of positioned nodes with their connections
//     //  */
//     // calculateLayout() {
//     // const nodes = [];
//     // const branches = [];
    
//     // if (this.direction === 'horizontal') {
//     //     this.layoutHorizontal(this.data, 0, this.height / 2, 0, nodes, branches);
//     // } else {
//     //     this.layoutVertical(this.data, this.width / 2, 0, 0, nodes, branches);
//     // }
    
//     // return { nodes, branches };
//     // }

// /**
//  * Calculate positions for all nodes in the tree
//  * @returns {Array} Array of positioned nodes with their connections
//  */
// calculateLayout() {
//   const nodes = [];
//   const branches = [];
  
//   if (this.direction === 'horizontal') {
//     const result = this.layoutHorizontal(this.data, 0, this.height / 2, 0, nodes, branches);
    
//     // Center the tree horizontally based on total width
//     const totalWidth = result.maxX;
//     const offsetX = (this.width - totalWidth) / 2;
    
//     // Apply offset to all nodes and branches
//     nodes.forEach(node => node.x += offsetX);
//     branches.forEach(branch => {
//       branch.x1 += offsetX;
//       branch.x2 += offsetX;
//     });
    
//   } else {
//     const result = this.layoutVertical(this.data, this.width / 2, 0, 0, nodes, branches);
    
//     // Center the tree vertically based on total height
//     const totalHeight = result.maxY;
//     const offsetY = (this.height - totalHeight) / 2;
    
//     // Apply offset to all nodes and branches
//     nodes.forEach(node => node.y += offsetY);
//     branches.forEach(branch => {
//       branch.y1 += offsetY;
//       branch.y2 += offsetY;
//     });
//   }
  
//   return { nodes, branches };
// }
//         /**
//      * Layout tree horizontally (left to right)
//      */
//     layoutHorizontal(node, x, y, level, nodes, branches) {
//     const currentNode = { label: node.label, x, y, level };
//     nodes.push(currentNode);
    
//     if (!node.children || node.children.length === 0) {
//         // Leaf node: mark it as a leaf and calculate extended width
//         currentNode.isLeaf = true;
//         return { minY: y, maxY: y, maxX: x + this.leafSpacing };
//     }
    
//     let childSpans = [];
//     let currentY = y;
//     let maxChildX = x;
    
//     node.children.forEach((child) => {
//         const childX = x + this.levelSpacing;
//         const span = this.layoutHorizontal(child, childX, currentY, level + 1, nodes, branches);
//         childSpans.push({ ...span, child, childX });
//         currentY = span.maxY + this.nodeSpacing;
//         maxChildX = Math.max(maxChildX, span.maxX);
//     });
    
//     const minY = childSpans[0].minY;
//     const maxY = childSpans[childSpans.length - 1].maxY;
//     const centerY = (minY + maxY) / 2;
    
//     currentNode.y = centerY;
    
//     childSpans.forEach(({ child, childX, minY, maxY }) => {
//         const childCenterY = (minY + maxY) / 2;
//         branches.push({
//         x1: x,
//         y1: centerY,
//         x2: childX,
//         y2: childCenterY,
//         label: child.label,
//         probability: child.probability
//         });
//     });
    
//     return { minY, maxY, maxX: maxChildX };
//     }
//     /**
//      * Layout tree vertically (top to bottom)
//      */
//     layoutVertical(node, x, y, level, nodes, branches) {
//     const currentNode = { label: node.label, x, y, level };
//     nodes.push(currentNode);
    
//     if (!node.children || node.children.length === 0) {
//         // Leaf node: y extends to make room for label
//         const leafEndY = y + this.leafSpacing;
//         return { minX: x, maxX: x, maxY: leafEndY }; // maxY for leaf labels
//     }
    
//     let childSpans = [];
//     let currentX = x;
//     let maxChildY = y; // Track bottom-most point
    
//     node.children.forEach((child) => {
//         const childY = y + this.levelSpacing;
//         const span = this.layoutVertical(child, currentX, childY, level + 1, nodes, branches);
//         childSpans.push({ ...span, child, childY });
//         currentX = span.maxX + this.nodeSpacing;
//         maxChildY = Math.max(maxChildY, span.maxY || childY); // Track tallest subtree
//     });
    
//     const minX = childSpans[0].minX;
//     const maxX = childSpans[childSpans.length - 1].maxX;
//     const centerX = (minX + maxX) / 2;
    
//     currentNode.x = centerX;
    
//     childSpans.forEach(({ child, childY, minX, maxX }) => {
//         const childCenterX = (minX + maxX) / 2;
//         branches.push({
//         x1: centerX,
//         y1: y,
//         x2: childCenterX,
//         y2: childY,
//         label: child.label,
//         probability: child.probability
//         });
//     });
    
//     return { minX, maxX, maxY: maxChildY };
//     }
//     render() {
//     const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
//     group.setAttribute("class", this.classes.join(" "));
    
//     // Calculate all positions
//     const { nodes, branches } = this.calculateLayout();
    
//     // Draw branches (lines with probability labels)
//     branches.forEach(branch => {
//         const line = new Line({
//         classes: this.branchClasses,
//         x1: branch.x1,
//         y1: branch.y1,
//         x2: branch.x2,
//         y2: branch.y2,
//         strokeWidth: this.strokeWidth,
//         label: branch.probability?.toString() || '',
//         labelClasses: this.labelClasses,
//         labelFontSize: this.labelFontSize
//         });
        
//         group.appendChild(line.render());
//     });
    
//     // Draw node labels
//     // Draw as Dot
//     // nodes.forEach(node => {
//     //     const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
//     //     text.setAttribute("x", node.x);
//     //     text.setAttribute("y", node.y);
//     //     text.setAttribute("class", this.labelClasses.join(" "));
//     //     text.setAttribute("font-size", this.labelFontSize);
//     //     text.setAttribute("text-anchor", "middle");
//     //     text.setAttribute("dominant-baseline", "middle");
//     //     text.textContent = node.label;
        
//     //     group.appendChild(text);
//     // });
//     // Draw node labels
//     nodes.forEach(node => {
//     const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    
//     // Position leaf labels to the right
//     const textX = node.isLeaf ? node.x + this.leafSpacing : node.x;
//     const anchor = node.isLeaf ? "start" : "middle";
    
//     text.setAttribute("x", textX);
//     text.setAttribute("y", node.y);
//     text.setAttribute("class", this.labelClasses.join(" "));
//     text.setAttribute("font-size", this.labelFontSize);
//     text.setAttribute("text-anchor", anchor);
//     text.setAttribute("dominant-baseline", "middle");
//     text.textContent = node.label;
    
//     group.appendChild(text);
//     });
    
//     return group;
//     }
