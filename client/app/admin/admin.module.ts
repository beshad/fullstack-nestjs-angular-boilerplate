import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import {
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbMenuModule,
  NbIconModule,
  NbCardModule
} from '@nebular/theme';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbCardModule
  ]
})
export class AdminModule { }
