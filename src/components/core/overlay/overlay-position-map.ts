import { ConnectionPositionPair } from '@angular/cdk/overlay';

export const POSITION_MAP = {
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
};
export const DEFAULT_4_POSITIONS = _objectValues([ POSITION_MAP[ 'top' ], POSITION_MAP[ 'right' ], POSITION_MAP[ 'bottom' ], POSITION_MAP[ 'left' ] ]);
export const DEFAULT_DROPDOWN_POSITIONS = _objectValues([ POSITION_MAP[ 'bottomLeft' ], POSITION_MAP[ 'topLeft' ] ]);
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

function arrayMap(array, iteratee) {
  let index = -1;
  const length = array == null ? 0 : array.length,
        result = Array(length);

  while (++index < length) {
    result[ index ] = iteratee(array[ index ], index, array);
  }
  return result;
}

function baseValues(object, props) {
  return arrayMap(props, function (key) {
    return object[ key ];
  });
}

function _objectValues(object) {
  return object == null ? [] : baseValues(object, Object.keys(object));
}
