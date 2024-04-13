const getTagRecursive = (tree: HTMLElement | Element, set: Set<string>) => {
  set.add(tree.tagName.toLowerCase());
  const childs = tree.children;
  for (let i = 0; i < childs.length; i++) {
    if (childs[i]) {
      getTagRecursive(childs[i], set);
    }
  }
};

const getTagIterative = (tree: HTMLElement | Element, set: Set<string>) => {
  let queue: (HTMLElement | Element)[] = [];
  queue.push(tree);

  while (queue.length !== 0) {
    let childQueue: (HTMLElement | Element)[] = [];
    while (queue.length !== 0) {
      const element = queue.pop();
      if (element) {
        set.add(element.tagName.toLowerCase());
        const child = element.children;
        for (let i = 0; i < child.length; i++) {
          childQueue.push(child[i]);
        }
      }
    }
    queue = [...childQueue];
  }
};
function getTags(tree: HTMLElement | Element) {
  const tagSet = new Set<string>();
  //   getTagRecursive(tree, tagSet);
  getTagIterative(tree, tagSet);

  return Array.from(tagSet);
}
