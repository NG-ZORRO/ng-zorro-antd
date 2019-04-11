// tslint:disable-next-line:no-any
export type NgClassType = string | string[] | Set<string> | NgClassInterface;

export interface NgClassInterface {
  [klass: string]: any; // tslint:disable-line:no-any
}

export interface NGStyleInterface {
  [klass: string]: any; // tslint:disable-line:no-any
}
