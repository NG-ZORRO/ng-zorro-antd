import { ConnectionPositionPair } from '@angular/cdk/overlay';

export const POSITION_MAP: { [key: string]: ConnectionPositionPair } = {
  'top'         : {
    originX : 'center',
    originY : 'top',
    overlayX: 'center',
    overlayY: 'bottom'
  },
  'topCenter'   : {
    originX : 'center',
    originY : 'top',
    overlayX: 'center',
    overlayY: 'bottom'
  },
  'topLeft'     : {
    originX : 'start',
    originY : 'top',
    overlayX: 'start',
    overlayY: 'bottom'
  },
  'topRight'    : {
    originX : 'end',
    originY : 'top',
    overlayX: 'end',
    overlayY: 'bottom'
  },
  'right'       : {
    originX : 'end',
    originY : 'center',
    overlayX: 'start',
    overlayY: 'center',
  },
  'rightTop'    : {
    originX : 'end',
    originY : 'top',
    overlayX: 'start',
    overlayY: 'top',
  },
  'rightBottom' : {
    originX : 'end',
    originY : 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  'bottom'      : {
    originX : 'center',
    originY : 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  'bottomCenter': {
    originX : 'center',
    originY : 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  'bottomLeft'  : {
    originX : 'start',
    originY : 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  'bottomRight' : {
    originX : 'end',
    originY : 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
  'left'        : {
    originX : 'start',
    originY : 'center',
    overlayX: 'end',
    overlayY: 'center',
  },
  'leftTop'     : {
    originX : 'start',
    originY : 'top',
    overlayX: 'end',
    overlayY: 'top',
  },
  'leftBottom'  : {
    originX : 'start',
    originY : 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
  },
} as { } as { [key: string]: ConnectionPositionPair };

// TODO: The whole logic does not make sense here, _objectValues just returns a copy of original array
export const DEFAULT_4_POSITIONS = _objectValues([ POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left]);
export const DEFAULT_DROPDOWN_POSITIONS = _objectValues([ POSITION_MAP.bottomLeft, POSITION_MAP.topLeft ]);

export const DEFAULT_DATEPICKER_POSITIONS = [
  {
    originX : 'start',
    originY : 'top',
    overlayX: 'start',
    overlayY: 'top',
  },
  {
    originX : 'start',
    originY : 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
  }
] as ConnectionPositionPair[];

function arrayMap<T, S>(array: T[], iteratee: (item: T, index: number, arr: T[]) => S): S[] {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result = Array(length);

  while (++index < length) {
    result[ index ] = iteratee(array[ index ], index, array);
  }
  return result;
}

function baseValues<T>(object: { [key: string]: T } | T[], props: string[]): T[] {
  return arrayMap(props,  (key) => {
    return object[ key ];
  });
}

function _objectValues<T>(object: { [key: string]: T } | T[]): T[] {
  return object == null ? [] : baseValues(object, Object.keys(object));
}
