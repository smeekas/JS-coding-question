function getByClassName(
  root: Element,
  className: string,
  set = new Set<Element>()
) {
  helper(root, className, set);
  return [...set];
}

function helper(root: Element, className: string, set: Set<Element>) {
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains(className)) {
      set.add(children[i]);
    }
    helper(children[i], className, set); //again call function with children element,and pass same sey
  }
}
// Our approach is kind of like DFS
