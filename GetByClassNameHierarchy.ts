function getByClassNameHierarchy(classes: string) {
  const classList = classes.split(">").map((classItem) => classItem.trim());

  const root = document.body;
  const arr = new Set<Element>();
  helper(root, classList, arr);
}
function helper(root: Element, classList: string[], arr: Set<Element>) {
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains(classList[0])) {
      //if children contain class....
      if (classList.length == 1) {
        //and there is only one class remaining means it is last one.
        //so add children to array.
        arr.add(children[i]);
      }
      //since we found class we will remove that and continue exploring next class in inside current children.
      helper(children[i], classList.slice(1), arr);

      /* 
      we will not write return/continue here because..
       If though we found out that current children contain first class, 
      It is possible that inside children there is element with first class.
      so to get that element we will also call function again as if current children do not
      contain first class
      */
      // due to above method we will find duplicate elements. so we are using set
    }
    //children doesn't contain class so call function again with current children as root.
    // we will try to find inside current children.
    helper(children[i], classList, arr);
  }
}
