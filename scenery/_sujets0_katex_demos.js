/**
 * Sujets0 KaTeX Demo Configurations
 * Each entry demonstrates different features with KaTeX mathematical notation
 */
export const sujets0KatexDemos = [
    {
        label: 'Spé sujet 1 Q7',
        description: 'Tryin',
        config: {
            width: 300,
            height: 300,
            margin: {
                top: 25,
                right: 25,
                bottom: 25,
                left: 25
            },
            svg: {
                classes: ['bg-base-100 border-base-content/10 border-1 brc'],
            },
            elements: [{
                nature: 'axes',
                classes: ['fill-secondary'],
                // grid: true, sujet 0 doesnt have grid for this one
                xMin: -5,
                xMax: 5,
                yMin: -2,
                yMax: 20,
                showAxisLabels: false,
                showTickLabels: false,
                xTicks: [],
                yTicks: [10],
            }, {
                nature: 'function',
                classes: ['stroke-primary'],
                f: (x) => x ** 2,
                xMin: -5,
                xMax: 5,
                yMin: -2,
                yMax: 20,
                tMin: -4,
                tMax: 4,
            }, {
                // Origin label: 0
                nature: 'foreign_object',
                x: 135,
                y: 240,
                centered: true,
                html: '<div data-diagraphe-latex="true" class="">$0$</div>'
            }, {
                // Y-axis tick label: 10
                nature: 'foreign_object',
                x: 140,
                y: 115,
                centered: true,
                html: '<div data-diagraphe-latex="true" class="">$10$</div>'
            }, {
                // X-axis label: x
                nature: 'foreign_object',
                x: 245,
                y: 240,
                centered: true,
                html: '<div data-diagraphe-latex="true" class="">$x$</div>'
            }, {
                // Y-axis label: y
                nature: 'foreign_object',
                x: 137,
                y: 5,
                centered: true,
                html: '<div data-diagraphe-latex="true" class="">$y$</div>'
            }, ]
        }
    }, {
        label: 'Spé sujet 1 Q8',
        description: 'Tryin',
        config: {
            width: 300,
            height: 300,
            margin: {
                top: 25,
                right: 25,
                bottom: 25,
                left: 25
            },
            svg: {
                classes: ['bg-base-100 border-base-content/10 border-1 brc'],
            },
            width: 550 / 1.5,
            height: 350 / 1.5,
            elements: [{
                    nature: 'axes',
                    classes: ['fill-secondary'],
                    xMin: -3,
                    xMax: 7,
                    yMin: -2,
                    yMax: 4,
                    grid: true,
                    showAxisLabels: false,
                    showTickLabels: false,
                    xTicks: [...Array(10).keys()].map(i => i - 3),
                    yTicks: [...Array(6).keys()].map(i => i - 2),
                }, {
                    nature: 'function',
                    classes: ['stroke-primary'],
                    f: (x) => (-2 / 3) * x + 2,
                    xMin: -3,
                    xMax: 7,
                    yMin: -2,
                    yMax: 4,
                    tMax: 6,
                }, {
                    nature: 'foreign_object',
                    x: 128,
                    y: 140,
                    centered: true,
                    html: '<div data-diagraphe-latex="true" class="text-sm font-bold">$1$</div>'
                }, {
                    nature: 'foreign_object',
                    x: 84,
                    y: 94,
                    centered: true,
                    html: '<div data-diagraphe-latex="true" class="text-sm font-bold">$1$</div>'
                }, {
                    // X-axis label: x
                    nature: 'foreign_object',
                    x: 308,
                    y: 135,
                    centered: true,
                    html: '<div data-diagraphe-latex="true">$x$</div>'
                }, {
                    // Y-axis label: y
                    nature: 'foreign_object',
                    x: 107,
                    y: 8,
                    centered: true,
                    html: '<div data-diagraphe-latex="true">$y$</div>'
                },

                {
                    nature: 'foreign_object',
                    x: 170,
                    y: 90,
                    centered: true,
                    html: '<div data-diagraphe-latex="true" class="text-primary">$\\mathcal{D}$</div>'
                }
            ]
        }
    }, {
        label: 'Spé sujet 1 Q10',
        description: 'Tryin',
        config: {
            width: 300,
            height: 300,
            margin: {
                top: 25,
                right: 25,
                bottom: 25,
                left: 25
            },
            svg: {
                classes: ['bg-base-100 border-base-content/10 border-1 brc'],
            },
            elements: [{
                nature: 'axes',
                classes: ['fill-secondary'],
                xMin: -5,
                xMax: 5,
                yMin: -10,
                yMax: 15,
                showTickLabels: false,
                showAxisLabels: false,
                xTicks: [0]
            }, {
                nature: 'function',
                classes: ['stroke-primary'],
                f: (x) => -(x ** 2) + 10,
                xMin: -5,
                xMax: 5,
                yMin: -5,
                yMax: 15,
                tMin: -3.8,
                tMax: 3.8,
            }, {
                // Origin label: O
                nature: 'foreign_object',
                x: 135,
                y: 163,
                centered: true,
                html: '<div data-diagraphe-latex="true">$0$</div>'
            }, {
                // X-axis label: x
                nature: 'foreign_object',
                x: 245,
                y: 163,
                centered: true,
                html: '<div data-diagraphe-latex="true">$x$</div>'
            }, {
                // Y-axis label: y
                nature: 'foreign_object',
                x: 137,
                y: 5,
                centered: true,
                html: '<div data-diagraphe-latex="true">$y$</div>'
            }, {
                nature: 'foreign_object',
                x: 175,
                y: 75,
                centered: true,
                html: '<div data-diagraphe-latex="true" class="text-primary">$\\mathcal{P}$</div>'
            }, ]
        }
    }, {
        label: 'Spé sujet 1 Q11',
        description: 'Tryin',
        config: {
            width: 300,
            height: 300,
            margin: {
                top: 25,
                right: 25,
                bottom: 25,
                left: 25
            },
            svg: {
                classes: ['bg-base-100 border-base-content/10 border-1 brc'],
            },
            elements: [{
                    nature: 'axes',
                    classes: ['fill-secondary'],
                    xMin: -4,
                    xMax: 4,
                    yMin: -4,
                    yMax: 4,
                    showTickLabels: true,
                    xTicks: [0]
                }, {
                    nature: 'function',
                    classes: ['stroke-primary'],
                    f: (x) => 0.1 * (x + 2) * (x - 1) * (x - 3),
                    xMin: -4,
                    xMax: 4,
                    yMin: -4,
                    yMax: 4,
                    tMin: -3.3,
                }, {
                    nature: 'cartesian_dot',
                    classes: ['fill-primary'],
                    x: -3,
                    xMin: -4,
                    xMax: 4,
                    yMin: -4,
                    yMax: 4,
                    y: 0.1 * (-3 + 2) * (-3 - 1) * (-3 - 3),
                }, {
                    nature: 'cartesian_dot',
                    classes: ['fill-primary'],
                    x: -1.5,
                    y: 0.1 * (-1.5 + 2) * (-1.5 - 1) * (-1.5 - 3),
                    xMin: -4,
                    xMax: 4,
                    yMin: -4,
                    yMax: 4,
                }, {
                    nature: 'cartesian_dot',
                    classes: ['fill-primary'],
                    x: 0.25,
                    y: 0.1 * (0.25 + 2) * (0.25 - 1) * (0.25 - 3),
                    xMin: -4,
                    xMax: 4,
                    yMin: -4,
                    yMax: 4,
                }, {
                    nature: 'cartesian_dot',
                    classes: ['fill-primary'],
                    x: 2.75,
                    y: 0.1 * (2.75 + 2) * (2.75 - 1) * (2.75 - 3),
                    xMin: -4,
                    xMax: 4,
                    yMin: -4,
                    yMax: 4,
                }, {
                    // Label A for dot at x=-3
                    nature: 'foreign_object',
                    x: 15,
                    y: 200,
                    centered: true,
                    html: '<div data-diagraphe-latex="true" class="text-primary">$A$</div>'
                }, {
                    // Label B for dot at x=-1.5
                    nature: 'foreign_object',
                    x: 63,
                    y: 103,
                    centered: true,
                    html: '<div data-diagraphe-latex="true" class="text-primary">$B$</div>'
                }, {
                    // Label R for dot at x=0.25
                    nature: 'foreign_object',
                    x: 135,
                    y: 95,
                    centered: true,
                    html: '<div data-diagraphe-latex="true" class="text-primary">$R$</div>'
                }, {
                    // Label S for dot at x=2.75
                    nature: 'foreign_object',
                    x: 223,
                    y: 140,
                    centered: true,
                    html: '<div data-diagraphe-latex="true" class="text-primary">$S$</div>'
                }, {
                    // X-axis label: x
                    nature: 'foreign_object',
                    x: 250,
                    y: 140,
                    centered: true,
                    html: '<div data-diagraphe-latex="true">$x$</div>'
                }, {
                    // Y-axis label: y
                    nature: 'foreign_object',
                    x: 138,
                    y: 5,
                    centered: true,
                    html: '<div data-diagraphe-latex="true">$y$</div>'
                },

            ]
        }
    }, {
        label: 'Spé sujet 2 Q1',
        description: 'Simple probability tree (left to right)',
        config: {
            width: 300,
            height: 300,
            margin: {
                top: 25,
                right: 25,
                bottom: 25,
                left: 25
            },
            svg: {
                classes: ['bg-base-100 border-base-content/10 border-1 brc'],
            },
            margin: {
                left: 0,
            },
            elements: [{
                nature: 'probability_tree',
                classes: ['tree'],
                direction: 'horizontal',
                data: {
                    label: '',
                    children: [{
                        label: 'A',
                        probability: 0.4,
                        children: [{
                            label: 'A1',
                            probability: 0.3
                        }, {
                            label: 'A2',
                            probability: null
                        }]
                    }, {
                        label: 'B',
                        probability: null,
                        children: [{
                            label: 'B1',
                            probability: null
                        }, {
                            label: 'B2',
                            probability: 0.9
                        }]
                    }]
                },
                branchClasses: ['stroke-primary'],
                labelClasses: ['fill-base-content'],
                // leafSpacing: 20,
            }]
        }
    }, {
        label: 'Spé sujet 2 Q8',
        description: 'Tryin',
        config: {
            width: 300,
            height: 300,
            margin: {
                top: 25,
                right: 25,
                bottom: 25,
                left: 25
            },
            svg: {
                classes: ['bg-base-100 border-base-content/10 border-1 brc'],
            },
            width: 300,
            height: 600,
            elements: [{
                nature: 'axes',
                classes: ['fill-secondary'],
                xTicks: [0],
                showTickLabels: true,
                showAxisLabels: true,
                xMin: -5,
                xMax: 5,
                yMin: -10,
                yMax: 10,
            }, {
                nature: 'function',
                classes: ['stroke-primary'],
                f: (x) => -2 * x,
                xTicks: [0],
                xMin: -5,
                xMax: 5,
                yMin: -10,
                yMax: 10,
            }, ]
        }
    }, ];
