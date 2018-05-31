import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';

export const selectTagAnimation: AnimationTriggerMetadata = trigger('selectTagAnimation', [
  state('*', style({ opacity: 1, transform: 'scale(1)' })),
  transition('void => *', [
    style({ opacity: 0, transform: 'scale(0)' }),
    animate('150ms linear')
  ]),
  state('void', style({ opacity: 0, transform: 'scale(0)' })),
  transition('* => void', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('150ms linear')
  ])
]);
