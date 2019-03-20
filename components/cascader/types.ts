export type NzCascaderExpandTrigger = 'click' | 'hover';

export type NzCascaderTriggerType = 'click' | 'hover';

export type NzCascaderSize = 'small' | 'large' | 'default' ;

export interface CascaderOption {
  value?: any; // tslint:disable-line:no-any
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: CascaderOption;
  children?: CascaderOption[];

  [ key: string ]: any; // tslint:disable-line:no-any
}

export interface CascaderSearchOption extends CascaderOption {
  path: CascaderOption[];
}

export type NzCascaderSorterFunction = (a: CascaderOption[], b: CascaderOption[], inputValue: string) => number;

export type NzCascaderFilterFunction = (inputValue: string, p: CascaderOption[]) => boolean;

export interface NzShowSearchOptions {
  filter?: NzCascaderFilterFunction;
  sorter?: NzCascaderSorterFunction;
}

export const isNzShowSearchOptions = (option: boolean | NzShowSearchOptions): option is NzShowSearchOptions => {
  return option instanceof Object;
};
