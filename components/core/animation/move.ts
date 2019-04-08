import { animate, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';
import { AnimationDuration } from './animation-consts';

export const moveUpMotion: AnimationTriggerMetadata = trigger('moveUpMotion', [
  transition('* => enter', [
    style({
      transformOrigin: '0 0',
      transform: 'translateY(-100%)',
      opacity: 0
    }),
    animate(
      `${AnimationDuration.BASE}`,
      style({
        transformOrigin: '0 0',
        transform: 'translateY(0%)',
        opacity: 1
      })
    )
  ]),
  transition('* => leave', [
    style({
      transformOrigin: '0 0',
      transform: 'translateY(0%)',
      opacity: 1
    }),
    animate(
      `${AnimationDuration.BASE}`,
      style({
        transformOrigin: '0 0',
        transform: 'translateY(-100%)',
        opacity: 0
      })
    )
  ])
]);
