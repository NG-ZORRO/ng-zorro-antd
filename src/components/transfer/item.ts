export interface TransferItem {
  title: string;
  direction?: 'left' | 'right';
  disabled?: boolean;
  checked?: boolean;
  _hiden?: boolean;
  /* tslint:disable-next-line:no-any */
  [key: string]: any;
}
