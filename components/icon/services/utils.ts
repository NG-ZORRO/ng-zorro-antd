import { ThemeType } from '@ant-design/icons/lib/types';
import { generate as generateColor } from 'ant-design-palettes';
import { IconSVGDefinition } from './types';

export function log(message: string): void {
  if (!(process && process.env && process.env.NODE_ENV === 'production')) {
    console.error(`[@ant-design/icons-angular]: ${message}.`);
  }
}

export function getSecondaryColor(primaryColor: string): string {
  return generateColor(primaryColor)[0];
}

export const withSuffix = function (name: string, theme: ThemeType): string {
  switch (theme) {
    case 'fill':
      return `${name}-fill`;
    case 'outline':
      return `${name}-o`;
    case 'twotone':
      return `${name}-twotone`;
    default:
      throw new TypeError(`Unknown theme type: ${theme}, name: ${name}`);
  }
};

export function isIconDefinition(target: any): target is IconSVGDefinition {
  return (
    typeof target === 'object' &&
    typeof target.name === 'string' &&
    typeof target.theme === 'string' &&
    (target.icon instanceof SVGElement || typeof target.icon === 'string')
  );
}
