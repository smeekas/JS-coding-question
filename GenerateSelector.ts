function generateSelector(element: HTMLElement) {
  const arr: Array<string> = [];
  helper(element, arr);
  return arr.join(">");
}

function helper(element: HTMLElement, arr: Array<string>) {
  if (element === document.body) {
    // if we are reached body tag means that we have reached root of the tree.
    arr.unshift("body");
    return;
  }
  if (element.id) {
    //add id if it exists
    arr.unshift(`#${element.id}`);
  } else if (element.className) {
    //else if class exists then add class
    arr.unshift(
      Array.from(element.classList)
        .map((ci) => `.${ci}`)
        .join("")
    );
  } else {
    // arr.unshift(element.tagName.toLowerCase());
    //you can use above method where we use tag-name as selector. but we will use :nth-child with tagName

    if (element.parentElement) {
      const childList = Array.from(element.parentElement.children);
      if (childList.length > 1) {
        // if number of siblings are > 1 then we need :nth-child selector otherwise we can use simply use tag-name
        const childIndex = childList.findIndex((ele) => ele === element);
        arr.unshift(
          element.tagName.toLowerCase() + `:nth-child(${childIndex + 1})`
        );
      } else {
        arr.unshift(element.tagName.toLowerCase());
      }
    }
  }
  if (element.parentElement) {
    // we will move to parent element
    helper(element.parentElement, arr);
  }
}
