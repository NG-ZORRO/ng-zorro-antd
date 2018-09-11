import { NzThemeType } from './nz-icon.component';

const fillRE = /-fill$/;
const outlinedRE = /-o$/;
const twoToneRE = /-twotone$/;

export const getThemeFromTypeName = function (type: string): NzThemeType | null {
  if (fillRE.test(type)) { return 'filled'; }
  if (outlinedRE.test(type)) { return 'outlined'; }
  if (twoToneRE.test(type)) { return 'twoTone'; }
  return null;
};

export const normalizeType = function (type: string, theme: NzThemeType): string {
  let ret;
  if (theme === 'filled') {
    ret += '-fill';
  } else if (theme === 'outlined') {
    ret += '-o';
  } else if (theme === 'twoTone') {
    ret += '-twotone';
  } else {
    console.warn(`[NG-ZORRO] This icon '${type}' has unknown theme '${theme}'`);
  }
  return ret;
};
