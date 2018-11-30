export type NzCascaderExpandTrigger = 'click' | 'hover';
export type NzCascaderTriggerType = 'click' | 'hover';
export type NzCascaderSize = 'small' | 'large' | 'default' ;

// tslint:disable:no-any
export interface CascaderOption {
  value?: any;
  label?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  isLeaf?: boolean;
  parent?: CascaderOption;
  children?: CascaderOption[];

  [ key: string ]: any;
}
// tslint:enable:no-any

export interface CascaderSearchOption extends CascaderOption {
  path: CascaderOption[];
}

export interface NzShowSearchOptions {
  filter?(inputValue: string, path: CascaderOption[]): boolean;
  sorter?(a: CascaderOption[], b: CascaderOption[], inputValue: string): number;
}
