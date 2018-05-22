import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const fadeAnimation: AnimationTriggerMetadata =  trigger('fadeAnimation', [
  state('void', style({ opacity: 0 })),
  state('true', style({ opacity: 1 })),
  state('false', style({ opacity: 0 })),
  transition('* => true', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
  transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
]);
