import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes
} from '@angular/animations';

const option = { optional: true };

export const stepper =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ]),
      group([
        query(':enter', [
          animate('2000ms ease', keyframes([
            style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
            style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
            style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
          ])),
        ], option),
        query(':leave', [
          animate('2000ms ease', keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
            style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
          ])),
        ], option)
      ]),
    ])
  ]);

export const slider =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          // top: 0,
          left: 0,
          width: '100%'
        })
      ], option),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      group([
        query(':leave', [
          animate('600ms ease', style({ left: '100%' }))
        ], option),
        query(':enter', [
          animate('600ms ease', style({ left: '0%' }))
        ])
      ]),
      // Required only if you have child animations on the page
      query(':leave', animateChild()),
      query(':enter', animateChild()),
    ]),
  ]);

