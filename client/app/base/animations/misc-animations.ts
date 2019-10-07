import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

// export const backgroundChange = 
//   trigger('buttonState', [
//     state('inactive', style({
//       backgroundColor: 'red'
//     })),
//     state('active', style({
//       backgroundColor: 'green'
//     })),
//     transition('inactive => active', animate('1000ms ease-in')),
//     transition('active => inactive', animate('1000ms ease-out'))
//   ]);

export const simpleBackgroundChange =
  trigger('backgroundState', [
    state('inactive', style({
      backgroundColor: 'red'
    })),
    state('active', style({
      backgroundColor: 'green'
    })),
    transition('inactive => active', animate('3000ms', keyframes([
      style({ backgroundColor: 'blue', offset: 0 }),
      style({ backgroundColor: 'red', offset: 0.8 }),
      style({ backgroundColor: 'orange', offset: 1})
    ]))),
    transition('active => inactive', animate('3000ms', keyframes([
      style({ backgroundColor: 'green' }),
      style({ backgroundColor: 'purple' }),
      style({ backgroundColor: 'pink' })
    ])))
  ]);
