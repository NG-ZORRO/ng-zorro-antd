/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import qrcodegen from './qrcodegen';
import { CrossOrigin, Excavation, ImageSettings, Modules } from './typing';
import { DEFAULT_LEVEL, ERROR_LEVEL_MAP, getImageSettings, getMarginSize } from './utils';

import QrSegment = qrcodegen.QrSegment;
import QrCode = qrcodegen.QrCode;

export const createQRCodeData = (
  value: string | string[],
  level = DEFAULT_LEVEL,
  minVersion: number,
  size: number,
  boostLevel: boolean,
  marginSize: number,
  imageSettings?: ImageSettings
): {
  cells: Modules;
  margin: number;
  numCells: number;
  calculatedImageSettings: null | {
    x: number;
    y: number;
    h: number;
    w: number;
    excavation: Excavation | null;
    opacity: number;
    crossOrigin: CrossOrigin;
  };
  qrcode: QrCode;
} => {
  const cs = memoizedQrcode(value, level, minVersion, boostLevel);
  const mg = getMarginSize(marginSize);
  const ncs = cs.getModules().length + mg * 2;
  const cis = getImageSettings(cs.getModules(), size, mg, imageSettings);

  return {
    cells: cs.getModules(),
    margin: mg,
    numCells: ncs,
    calculatedImageSettings: cis,
    qrcode: cs
  };
};

export const memoizedQrcode = (
  value: string | string[],
  level = DEFAULT_LEVEL,
  minVersion: number,
  boostLevel: boolean
): QrCode => {
  const values = Array.isArray(value) ? value : [value];
  const segments = values.reduce<QrSegment[]>((acc, val) => {
    acc.push(...QrSegment.makeSegments(val));
    return acc;
  }, []);
  return qrcodegen.QrCode.encodeSegments(
    segments,
    ERROR_LEVEL_MAP[level],
    minVersion,
    undefined,
    undefined,
    boostLevel
  );
};
