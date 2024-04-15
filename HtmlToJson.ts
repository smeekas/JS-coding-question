type ElementType = {
  type: Element["tagName"];
  props: Record<string, any>;
  children: ElementType[] | Element["textContent"];
};
function getAttributes(node: Element) {
  const generatedAttributes: Record<string, any> = {};
  for (let i = 0; i < node.attributes.length; i++) {
    generatedAttributes[node.attributes[i].name] = node.attributes[i].value;
  }
  return generatedAttributes;
}
function htmlToJSON(node: Element) {
  let childResult: Element["textContent"] | ElementType[] | null = null;
  const children = node.children;
  if (children.length === 0) {
    childResult = node.textContent;
  } else {
    let htmlChildArray: ElementType[] = [];
    for (let i = 0; i < children.length; i++) {
      htmlChildArray[i] = htmlToJSON(children[i]);
    }
    childResult = htmlChildArray;
  }
  const result: ElementType = {
    type: node.tagName,
    props: getAttributes(node),
    children: childResult,
  };
  return result;
}
