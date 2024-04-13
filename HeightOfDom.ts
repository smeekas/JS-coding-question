function getHeight_recursive(tree: HTMLElement | Element | null) {
  let maxHeight = 0;
  if (tree === null) return 0;
  const child = tree.children;
  for (let i = 0; i < child.length; i++) {
    maxHeight = Math.max(maxHeight, getHeight_recursive(child[i]));
  }
  return maxHeight + 1;
}

function getHeight_iterative(tree: HTMLElement | Element | null) {
  // LEVEL ORDER TRAVERSAL
  let maxHeight = 0;
  if (tree === null) return 0;
  let queue: (HTMLElement | Element)[] = [];
  queue.push(tree); //root
  while (queue.length !== 0) {
    let childQueue: (HTMLElement | Element)[] = []; //we will store next level nodes here.
    while (queue.length !== 0) {
      const queueItem = queue.shift(); //remove element from queue
      if (queueItem) {
        const child = queueItem.children;
        for (let i = 0; i < child.length; i++) { //add all children of removed node.
          childQueue.push(child[i]);
        }
      }
    }
    // now add all children to main queue.
    queue = [...childQueue];
    // since we have traversed on level so we will increase height
    maxHeight++;
  }
  return maxHeight;
}
