interface Function {
  mycall: (thisArg: any, ...args: any) => any;
  mybind: (thisArg: any, ...args: any) => Function;
}
