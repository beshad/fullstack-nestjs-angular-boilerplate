import { trigger, state, style, animate, transition } from '@angular/animations';

export const backgroundChange = 
  trigger('buttonState', [
    state('inactive', style({
      backgroundColor: 'red'
    })),
    state('active', style({
      backgroundColor: 'green'
    })),
    transition('inactive => active', animate('1000ms ease-in')),
    transition('active => inactive', animate('1000ms ease-out'))
  ]);