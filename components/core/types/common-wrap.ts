// Define a property that can also returned by called function
export type FunctionProp<T> = T | ((...args: any[]) => T) ; // tslint:disable-line:no-any
