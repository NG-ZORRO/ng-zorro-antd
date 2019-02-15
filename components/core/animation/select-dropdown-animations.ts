import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';

export const selectDropDownAnimation: AnimationTriggerMetadata = trigger('selectDropDownAnimation', [
  state('void', style({
    opacity: 0,
    display: 'none'
  })),
  state('bottom', style({
    opacity        : 1,
    transform      : 'scaleY(1)',
    transformOrigin: '0% 0%'
  })),
  state('top', style({
    opacity        : 1,
    transform      : 'scaleY(1)',
    transformOrigin: '0% 100%'
  })),
  transition('void => bottom', [
    style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    }),
    animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
  ]),
  transition('bottom => void', [
    animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    }))
  ]),
  transition('void => top', [
    style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 100%'
    }),
    animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
  ]),
  transition('top => void', [
    animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 100%'
    }))
  ])
]);
