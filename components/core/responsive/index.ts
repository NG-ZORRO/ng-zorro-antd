export enum Breakpoint {
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs'
}

export type BreakpointMap = { [index in keyof typeof Breakpoint]: string };

export const responsiveMap: BreakpointMap = {
  xs : '(max-width: 575px)',
  sm : '(min-width: 576px)',
  md : '(min-width: 768px)',
  lg : '(min-width: 992px)',
  xl : '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};
