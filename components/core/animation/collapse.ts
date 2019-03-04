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
  state('hidden', style({ height: 0, display: 'none' })),
  transition('expanded => collapsed', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('expanded => hidden', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('collapsed => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('hidden => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`))
]);
