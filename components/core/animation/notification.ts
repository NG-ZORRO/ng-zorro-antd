import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';

export const notificationMotion: AnimationTriggerMetadata = trigger('notificationMotion', [
  state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('* => enterRight', [style({ opacity: 0, transform: 'translateX(5%)' }), animate('100ms linear')]),
  state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('* => enterLeft', [style({ opacity: 0, transform: 'translateX(-5%)' }), animate('100ms linear')]),
  state(
    'leave',
    style({
      opacity: 0,
      transform: 'scaleY(0.8)',
      transformOrigin: '0% 0%'
    })
  ),
  transition('* => leave', [
    style({
      opacity: 1,
      transform: 'scaleY(1)',
      transformOrigin: '0% 0%'
    }),
    animate('100ms linear')
  ])
]);
