# TODO

## Critical



-  [] html: '<div data-diagraphe-latex="true" class="text-primary" style="white-space: nowrap;">$m=4$</div>', necessary if "="

- [] Not tag conssitent with merge sel:dev and mad:main

- [ ] Ensure that Diagraphe never uses ids that are not dynamically generated 
    - [ ] (and unique at least in a trame.html (Trame(trame.md).to_html_for_jinja..))


- [ ] "type" every argument of every constructor




## 🧂 to 🔌 

- showAxisLabels / showTickLabels -> showXLabels / showYLabels
- add labelClass when there is a label (dots?)

## Refactoring

- [ ] Centralize dependencies

## Elements

### Refactoring


- [ ] should heatmap and tree use basic_shapes ?
    - Ragarding this approach: I may tolerate redundancy of axes just because it would create a spaghetti
- [ ] split render method of axes and tree between renderShape and renderLabel

### ABC

- [ ] render label method
- [x] rename Math* Cartesian*


### Library

- [ ] label for parametric curves