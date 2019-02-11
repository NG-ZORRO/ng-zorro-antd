import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';
import { AnimationCurves } from './animation';

export const collapseMotion: AnimationTriggerMetadata = trigger('collapseMotion', [
  state('expanded', style({ height: '*' })),
  state('collapsed', style({ height: 0, overflow: 'hidden' })),
  transition('expanded => collapsed', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('collapsed => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`))
]);
