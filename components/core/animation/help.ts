import {
  animate,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animation';

export const helpMotion: AnimationTriggerMetadata = trigger('helpMotion', [
  transition(':enter', [
    style({
      opacity  : 0,
      transform: 'translateY(-5px)'
    }),
    animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
      opacity  : 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    style({
      opacity  : 1,
      transform: 'translateY(0)'
    }),
    animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
      opacity  : 0,
      transform: 'translateY(-5px)'
    }))
  ])
]);
