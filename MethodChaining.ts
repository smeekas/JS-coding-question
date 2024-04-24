function $(selector: string) {
  const element = document.querySelector(selector);
  return {
    css(property: string, value: string) {
      if (element) {
        (element as HTMLElement).style.setProperty(property, value);
      }

      // if css is arrow function then It will utilize this of $ which is window.
      // in case of method or function  it will refer to $
      return this;
    },
  };
}
$("#button")
  .css("color", "#fff")
  .css("backgroundColor", "#000")
  .css("fontWeight", "bold");
