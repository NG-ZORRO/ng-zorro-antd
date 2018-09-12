/**
 * Some type definitions of ant-design-icons are not suitale for Angular, so some override here is necessary.
 * Overrided definitions would be marked.
 */

import { ThemeType } from '@ant-design/icons/lib/types';

/**
 * Override.
 */
export interface IconDefinition {
  name: string;
  theme: ThemeType;
}

export interface IconSVGDefinition extends IconDefinition {
  svgElement: SVGElement | string | null;
}

export interface TwoToneColorPalette extends TwoToneColorPaletteSetter{
  secondaryColor: string;
}

export interface TwoToneColorPaletteSetter {
  primaryColor: string;
  secondaryColor?: string;
}
