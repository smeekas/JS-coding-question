class BrowserHistory {
  stack: string[] = [];
  index: number = -1;
  initialUrl: string | null = null;
  constructor(url?: string) {
    if (url) {
      this.stack.push(url);
      this.index = 0;
      this.initialUrl = url;
    }
  }

  visit(url: string) {
    this.stack[++this.index] = url;
  }

  get current() {
    return this.stack[this.index];
  }

  // go to previous entry
  goBack() {
    if (this.index > 0) {
      return this.stack[--this.index];
    } else if (this.index === 0) {
      // If we have started with initial Url then we have return that only.
      return this.initialUrl ? this.initialUrl : this.stack[--this.index];
    }
    return undefined;
  }

  // go to next visited url
  forward() {
    const length = this.stack.length;
    if (this.index < length - 1) {
      return this.stack[++this.index];
    } else if (this.index === length - 1) {
      //after reaching end we have to return that end only
      return this.stack[this.index];
    }
    return undefined;
  }
}
