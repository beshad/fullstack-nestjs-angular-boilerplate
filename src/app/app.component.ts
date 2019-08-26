import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
     <router-outlet></router-outlet>
  `
})
export class AppComponent implements AfterViewChecked {

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
