import { Element } from './element.js';
import { Line } from './basic_shapes.js';

export class ProbabilityTree extends Element {
    /**
     * @param {Object} options - Probability tree configuration
     * @param {Array<string>} options.classes - CSS classes for the group
     * @param {number} options.width - Available width
     * @param {number} options.height - Available height
     * @param {Object} options.data - Tree data structure
     * @param {string} [options.direction='horizontal'] - Tree direction: 'horizontal' or 'vertical'
     * @param {number} [options.nodeSpacing=50] - Spacing between nodes
     * @param {number} [options.levelSpacing=100] - Spacing between levels
     * @param {number} [options.leafSpacing=10] - Extra space after each node for labels
     * @param {Array<string>} [options.branchClasses] - CSS classes for branches
     * @param {Array<string>} [options.labelClasses] - CSS classes for labels
     * @param {number} [options.labelFontSize=12] - Font size for labels
     * @param {number} [options.strokeWidth=2] - Branch line width
     */
    constructor(options) {
        super(options);

        this.width = options.width;
        this.height = options.height;
        this.data = options.data;
        this.direction = options.direction ?? 'horizontal';
        this.nodeSpacing = options.nodeSpacing ?? 50;
        this.levelSpacing = options.levelSpacing ?? 100;
        this.leafSpacing = options.leafSpacing ?? 10;
        this.branchClasses = options.branchClasses ?? ['stroke-base-content'];
        this.labelClasses = options.labelClasses ?? ['fill-base-content'];
        this.labelFontSize = options.labelFontSize ?? 12;
        this.strokeWidth = options.strokeWidth ?? 2;
        this.labelOffset = 5;
        this.leafSpacing = 20;
    }

    /**
     * Calculate positions for all nodes in the tree
     * @returns {Object} Object containing nodes and branches arrays
     */
    calculateLayout() {
        const nodes = [];
        const branches = [];
        
        if (this.direction === 'horizontal') {
            const result = this.layoutHorizontal(this.data, 0, 0, 0, nodes, branches);
            
            // Center the tree horizontally based on total width
            const totalWidth = result.maxX;
            // const offsetX = (this.width - totalWidth) / 2;
            const offsetX = this.labelOffset;
            
            // Apply offset to all nodes and branches
            nodes.forEach(node => node.x += offsetX + this.leafSpacing);
            branches.forEach(branch => {
                branch.x1 += this.leafSpacing;
                branch.x2 += this.leafSpacing;
            });
            
        } else {
            const result = this.layoutVertical(this.data, 0, 0, 0, nodes, branches);
            
            // Center the tree vertically based on total height
            const totalHeight = result.maxY;
            // const offsetY = (this.height - totalHeight) / 2;
            const offsetY = this.labelOffset;
            
            // Apply offset to all nodes and branches
            nodes.forEach(node => node.y += offsetY + this.leafSpacing);
            branches.forEach(branch => {
                branch.y1 += this.leafSpacing;
                branch.y2 += this.leafSpacing;
            });
        }
        
        return { nodes, branches };
    }

    /**
     * Layout tree horizontally (left to right)
     */
    layoutHorizontal(node, x, y, level, nodes, branches) {
        const currentNode = { label: node.label, x, y, level };
        nodes.push(currentNode);
        
        // Add spacing after node for label
        const nodeEndX = x + this.leafSpacing;
        
        if (!node.children || node.children.length === 0) {
            // Leaf node
            return { minY: y, maxY: y, maxX: nodeEndX };
        }
        
        let childSpans = [];
        let currentY = y;
        let maxChildX = nodeEndX;
        
        node.children.forEach((child) => {
            const childX = nodeEndX + this.levelSpacing;
            const span = this.layoutHorizontal(child, childX, currentY, level + 1, nodes, branches);
            childSpans.push({ ...span, child, childX });
            currentY = span.maxY + this.nodeSpacing;
            maxChildX = Math.max(maxChildX, span.maxX);
        });
        
        const minY = childSpans[0].minY;
        const maxY = childSpans[childSpans.length - 1].maxY;
        const centerY = (minY + maxY) / 2;
        
        currentNode.y = centerY;
        
        childSpans.forEach(({ child, childX, minY, maxY }) => {
            const childCenterY = (minY + maxY) / 2;
            branches.push({
                x1: nodeEndX,
                y1: centerY,
                x2: childX,
                y2: childCenterY,
                label: child.label,
                probability: child.probability
            });
        });
        
        return { minY, maxY, maxX: maxChildX };
    }

    /**
     * Layout tree vertically (top to bottom)
     */
    layoutVertical(node, x, y, level, nodes, branches) {
        const currentNode = { label: node.label, x, y, level };
        nodes.push(currentNode);
        
        // Add spacing after node for label
        const nodeEndY = y + this.leafSpacing;
        
        if (!node.children || node.children.length === 0) {
            // Leaf node
            return { minX: x, maxX: x, maxY: nodeEndY };
        }
        
        let childSpans = [];
        let currentX = x;
        let maxChildY = nodeEndY;
        
        node.children.forEach((child) => {
            const childY = nodeEndY + this.levelSpacing;
            const span = this.layoutVertical(child, currentX, childY, level + 1, nodes, branches);
            childSpans.push({ ...span, child, childY });
            currentX = span.maxX + this.nodeSpacing;
            maxChildY = Math.max(maxChildY, span.maxY);
        });
        
        const minX = childSpans[0].minX;
        const maxX = childSpans[childSpans.length - 1].maxX;
        const centerX = (minX + maxX) / 2;
        
        currentNode.x = centerX;
        
        childSpans.forEach(({ child, childY, minX, maxX }) => {
            const childCenterX = (minX + maxX) / 2;
            branches.push({
                x1: centerX,
                y1: nodeEndY,
                x2: childCenterX,
                y2: childY,
                label: child.label,
                probability: child.probability
            });
        });
        
        return { minX, maxX, maxY: maxChildY };
    }

    render() {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("class", this.classes.join(" "));
        
        // Calculate all positions
        const { nodes, branches } = this.calculateLayout();
        
        // Draw branches (lines with probability labels)
        branches.forEach(branch => {
            const line = new Line({
                classes: this.branchClasses,
                x1: branch.x1,
                y1: branch.y1,
                x2: branch.x2,
                y2: branch.y2,
                strokeWidth: this.strokeWidth,
                label: branch.probability?.toString() || '',
                labelClasses: this.labelClasses,
                labelFontSize: this.labelFontSize
            });
            
            group.appendChild(line.render());
        });
        
        // Draw node labels
        nodes.forEach(node => {
            // Skip root if it has no label
            if (node.level === 0 && !node.label) return;
            
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            
            let textX = node.x;
            let textY = node.y;
            let anchor = "middle";
            let baseline = "middle";
            
            // Position labels based on direction
            if (this.direction === 'horizontal') {
                // Horizontal tree: labels to the right of nodes
                // textX = node.x + this.leafSpacing;
                textX = node.x;
                anchor = "start";
            } else {
                // Vertical tree: labels below nodes
                // textY = node.y + this.leafSpacing;
                textY = node.y;
                baseline = "hanging";
            }
            
            text.setAttribute("x", textX);
            text.setAttribute("y", textY);
            text.setAttribute("class", this.labelClasses.join(" "));
            text.setAttribute("font-size", this.labelFontSize);
            text.setAttribute("text-anchor", anchor);
            text.setAttribute("dominant-baseline", baseline);
            text.textContent = node.label;
            
            group.appendChild(text);
        });
        
        return group;
    }
}