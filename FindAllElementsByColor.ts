function getStandardColor(colorCode: string) {
  // element.style won't give css applied via css.
  // It will only give styles applied via style attribute
  // so we use window.getComputedStyle
  // It will also normalize various properties.
  //ex. for color  #fff, #fff,hsl(0deg 0% 100%) all will be converted to same rgb(255,255,255)
  // to get that computed value we first have to create dummy element, apply that color and push element into dom.
  const div = document.createElement("div");
  div.style.color = colorCode;
  document.body.appendChild(div);
  const computedColor = getComputedStyle(div).color;
  document.body.removeChild(div);
  div.remove();
  return computedColor;
}

function findAllElementsByColor(
  property: keyof CSSStyleDeclaration,
  color: string
) {
  const set = new Set<HTMLElement>();
  helper(document.body, property, color, set);
  return [...set];
}

function helper(
  root: HTMLElement,
  property: keyof CSSStyleDeclaration,
  value: string,
  set: Set<HTMLElement>
) {
  const propValue = getComputedStyle(root)[property];
  if (propValue) {
    const computedColor = getStandardColor(value);
    if (propValue === computedColor) {
      set.add(root);
    }
  }
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    helper(children[i] as HTMLElement, property, value, set);
  }
}
