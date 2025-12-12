/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// ==========================================================
import qrcodegen from './qrcodegen';
import type {
  CrossOrigin,
  ERROR_LEVEL_MAPPED_TYPE,
  ErrorCorrectionLevel,
  Excavation,
  ImageSettings,
  Modules
} from './typing';

import Ecc = qrcodegen.QrCode.Ecc;

// =================== ERROR_LEVEL ==========================
export const ERROR_LEVEL_MAP: ERROR_LEVEL_MAPPED_TYPE = {
  L: Ecc.LOW,
  M: Ecc.MEDIUM,
  Q: Ecc.QUARTILE,
  H: Ecc.HIGH
} as const;

// =================== DEFAULT_VALUE ==========================
export const DEFAULT_LEVEL: ErrorCorrectionLevel = 'M';
export const DEFAULT_BACKGROUND_COLOR = '#FFFFFF';
export const DEFAULT_FRONT_COLOR = '#000000';
export const DEFAULT_MINVERSION = 1;
export const DEFAULT_IMG_SCALE = 0.1;

// =================== UTILS ==========================
/**
 * Generate a path string from modules
 * @param modules
 * @param margin
 * @returns
 */
export const generatePath = (modules: Modules, margin: number = 0): string => {
  const ops: string[] = [];
  modules.forEach((row, y) => {
    let start: number | null = null;
    row.forEach((cell, x) => {
      if (!cell && start !== null) {
        ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
        start = null;
        return;
      }

      if (x === row.length - 1) {
        if (!cell) {
          return;
        }
        if (start === null) {
          ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
        } else {
          ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`);
        }
        return;
      }

      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join('');
};

/**
 * Excavate modules
 * @param modules
 * @param excavation
 * @returns
 */
export const excavateModules = (modules: Modules, excavation: Excavation): Modules => {
  return modules.slice().map((row, y) => {
    if (y < excavation.y || y >= excavation.y + excavation.h) {
      return row;
    }
    return row.map((cell, x) => {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell;
      }
      return false;
    });
  });
};

/**
 * Get image settings
 * @param cells The modules of the QR code
 * @param size The size of the QR code
 * @param margin
 * @param imageSettings
 * @returns
 */
export const getImageSettings = (
  cells: Modules,
  size: number,
  margin: number,
  imageSettings?: ImageSettings
): null | {
  x: number;
  y: number;
  h: number;
  w: number;
  excavation: Excavation | null;
  opacity: number;
  crossOrigin: CrossOrigin;
} => {
  if (imageSettings == null) {
    return null;
  }
  const numCells = cells.length + margin * 2;
  const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
  const scale = numCells / size;
  const w = (imageSettings.width || defaultSize) * scale;
  const h = (imageSettings.height || defaultSize) * scale;
  const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale;
  const y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale;
  const opacity = imageSettings.opacity == null ? 1 : imageSettings.opacity;

  let excavation = null;
  if (imageSettings.excavate) {
    const floorX = Math.floor(x);
    const floorY = Math.floor(y);
    const ceilW = Math.ceil(w + x - floorX);
    const ceilH = Math.ceil(h + y - floorY);
    excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH };
  }

  const crossOrigin = imageSettings.crossOrigin;

  return { x, y, h, w, excavation, opacity, crossOrigin };
};

/**
 * Get margin size
 * @param needMargin Whether need margin
 * @param marginSize Custom margin size
 * @returns
 */
export const getMarginSize = (marginSize: number): number => Math.max(Math.floor(marginSize), 0);

/**
 * Check if Path2D is supported
 */
export const isSupportPath2d = (() => {
  try {
    new Path2D().addPath(new Path2D());
  } catch {
    return false;
  }
  return true;
})();
