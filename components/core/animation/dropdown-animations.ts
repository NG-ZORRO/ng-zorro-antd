import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const dropDownAnimation: AnimationTriggerMetadata = trigger('dropDownAnimation', [
  state('bottom', style({
    opacity        : 1,
    transform      : 'scaleY(1)',
    transformOrigin: '0% 0%'
  })),
  transition('void => bottom', [
    style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    }),
    animate('150ms cubic-bezier(0.23, 1, 0.32, 1)')
  ]),
  transition('bottom => void', [
    animate('150ms cubic-bezier(0.23, 1, 0.32, 1)', style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    }))
  ]),
  state('top', style({
    opacity        : 1,
    transform      : 'scaleY(1)',
    transformOrigin: '0% 100%'
  })),
  transition('void => top', [
    style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 100%'
    }),
    animate('150ms cubic-bezier(0.23, 1, 0.32, 1)')
  ]),
  transition('top => void', [
    animate('150ms cubic-bezier(0.23, 1, 0.32, 1)', style({
      opacity        : 0,
      transform      : 'scaleY(0.8)',
      transformOrigin: '0% 100%'
    }))
  ])
]);
