import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Users',
      icon: { icon: 'person-outline', pack: 'eva' }
    },
    {
      title: 'Cats',
      icon: { icon: 'lock-outline', pack: 'eva' }
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
