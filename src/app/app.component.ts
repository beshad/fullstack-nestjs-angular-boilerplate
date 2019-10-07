import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider, stepper, fader } from './base/animations/route-animations';


@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar> 
  <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
   </div>
  `,
  animations: [ 
    slider,
    // fader,
    // transformer,
   ]
})

export class AppComponent implements AfterViewChecked {

  constructor(private changeDetector: ChangeDetectorRef) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
