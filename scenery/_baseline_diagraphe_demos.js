/**
 * Diagraphe Demo Configurations
 * Each entry demonstrates different features of the Diagraphe library
 */
export const baselineDiagrapheDemos = [
    // ═══════════════════════════════════════════════════════════════
    // SECTION 1: SVG Classes (Fill variants)
    // ═══════════════════════════════════════════════════════════════
    {
        label: '🎨 Complete 08/12',
        description: 'svg: fill-primary',
        config: {
            width: 300,
            height: 200,
            margin: {
                top: 30,
                right: 40,
                bottom: 30,
                left: 40
            },
            svg: {
                classes: ['bg-base-300'],
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-primary'],
                width: 50,
                height: 50
            }]
        }
    },
    {
        label: '🎨 Secondary Color Fill - Default Margins',
        description: 'Secondary theme color with default 20px margins all around',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['fill-secondary'],
                width: 160,
                height: 60
            }]
        }
    },

    {
        label: '🟢 Large Coords Not responsive (viewBox)',
        description: '',
        config: {
            width: 500,
            height: 100,
            viewBox: {
                width: 500,
                height: 100
            },
            svg: {
                classes: ['bg-base-300'],
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-neutral'],
                width: 400,
                height: 80
            }]
        }
    },
    {
        label: '🟢 Large Coords Responsive (no viewBox)',
        description: '',
        config: {
            width: 500,
            height: 100,
            responsive: true,
            viewBox: {
                width: 500,
                height: 100
            },
            svg: {
                classes: ['bg-base-300'],
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-neutral'],
                width: 400,
                height: 80
            }]
        }
    },
    {
        label: '🎨 Accent Color Fill - Asymmetric Margins',
        description: 'Accent color with different margins (simulating axis space)',
        config: {
            width: 200,
            height: 100,
            margin: {
                top: 10,
                right: 15,
                bottom: 25,
                left: 35
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-accent'],
                width: 130,
                height: 50
            }]
        }
    },
    {
        label: '🎨 Neutral Color Fill - Minimal Margins',
        description: 'Neutral color with tight 5px margins for maximum chart area',
        config: {
            width: 200,
            height: 100,
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-neutral'],
                width: 180,
                height: 80
            }]
        }
    },
    {
        label: '✅ Success State Fill - Chart Margins',
        description: 'Success color with chart-like margins (left/bottom for axes)',
        config: {
            width: 200,
            height: 100,
            margin: {
                top: 10,
                right: 10,
                bottom: 30,
                left: 40
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-success'],
                width: 140,
                height: 50
            }]
        }
    },
    {
        label: '⚠️ Warning State Fill - Standard Layout',
        description: 'Warning color with standard margins for alerts/notifications',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['fill-warning'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: '❌ Error State Fill - Compact Layout',
        description: 'Error color with zero margins for full-bleed display',
        config: {
            width: 200,
            height: 100,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-error'],
                width: 200,
                height: 100
            }]
        }
    },
    {
        label: 'ℹ️ Info State Fill - Dashboard Style',
        description: 'Info color with dashboard-style padding and spacing',
        config: {
            width: 200,
            height: 100,
            margin: {
                top: 15,
                right: 15,
                bottom: 15,
                left: 15
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-info'],
                width: 160,
                height: 60
            }]
        }
    },
    {
        label: '🎨 Base-100 Fill - Background Color',
        description: 'Lightest base color, typically matches page background',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: '🎨 Base-200 Fill - Card Background',
        description: 'Medium base color, commonly used for card backgrounds',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['fill-base-200'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: '🎨 Base-300 Fill - Border Color',
        description: 'Darker base color, often used for borders and dividers',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['fill-base-300'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: '🎨 Base-Content Fill - Text Color',
        description: 'Content color that contrasts with base backgrounds',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['fill-base-content'],
                width: 160,
                height: 80
            }]
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // SECTION 2: SVG Classes (Stroke + Fill variants)
    // ═══════════════════════════════════════════════════════════════
    {
        label: '🖊️ Primary Stroke - Array Classes Demo',
        description: 'Demonstrates stroke + fill using class array format',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-primary', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: '🖊️ Secondary Stroke - Mixed Format',
        description: 'Shows backward compatibility with string format',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-secondary', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: '🖊️ Accent Stroke - Multiple Classes',
        description: 'Array format with additional utility classes',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-accent', 'fill-base-100', 'stroke-2'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Neutral',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-neutral', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Success',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-success', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Warning',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-warning', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Error',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-error', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Info',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-info', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Base 100',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-base-100', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Base 200',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-base-200', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Base 300',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-base-300', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'Stroke Base Content',
        description: 'Stroke with base-100 fill',
        config: {
            width: 200,
            height: 100,
            elements: [{
                nature: 'rect',
                classes: ['stroke-base-content', 'fill-base-100'],
                width: 160,
                height: 80
            }]
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // SECTION 3: viewBox Demonstrations
    // ═══════════════════════════════════════════════════════════════
    {
        label: 'viewBox 1:1',
        description: 'viewBox matches display (200×100)',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                width: 200,
                height: 100
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-primary'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'viewBox 2× Zoom',
        description: 'viewBox half of display = 2× zoom',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                width: 100,
                height: 50
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-secondary'],
                width: 80,
                height: 40
            }]
        }
    },
    {
        label: 'viewBox 0.5× Zoom',
        description: 'viewBox double of display = zoomed out',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                width: 400,
                height: 200
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-accent'],
                width: 320,
                height: 160
            }]
        }
    },
    {
        label: 'viewBox Offset (Pan)',
        description: 'minX/minY shifts the origin (panning)',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                minX: -20,
                minY: -20,
                width: 200,
                height: 100
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-info'],
                width: 160,
                height: 80
            }]
        }
    },
    {
        label: 'preserveAspectRatio: meet',
        description: 'Square viewBox in wide display (fits inside)',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                width: 100,
                height: 100
            },
            preserveAspectRatio: 'xMidYMid meet',
            elements: [{
                nature: 'rect',
                classes: ['fill-success'],
                width: 80,
                height: 80
            }]
        }
    },
    {
        label: 'preserveAspectRatio: slice',
        description: 'Square viewBox in wide display (fills & clips)',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                width: 100,
                height: 100
            },
            preserveAspectRatio: 'xMidYMid slice',
            elements: [{
                nature: 'rect',
                classes: ['fill-warning'],
                width: 80,
                height: 80
            }]
        }
    },
    {
        label: 'preserveAspectRatio: none',
        description: 'Square viewBox stretched to fit',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                width: 100,
                height: 100
            },
            preserveAspectRatio: 'none',
            elements: [{
                nature: 'rect',
                classes: ['fill-error'],
                width: 80,
                height: 80
            }]
        }
    },
    {
        label: 'Large Internal Coords',
        description: 'viewBox 1000×500, display 200×100',
        config: {
            width: 200,
            height: 100,
            viewBox: {
                width: 1000,
                height: 500
            },
            elements: [{
                nature: 'rect',
                classes: ['fill-neutral'],
                width: 800,
                height: 400
            }]
        }
    }
];