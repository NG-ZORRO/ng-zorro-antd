export interface TransferItem {
  title: string;
  direction?: 'left' | 'right';
  disabled?: boolean;
  checked?: boolean;
  _hiden?: boolean;
  [key: string]: any;
}
