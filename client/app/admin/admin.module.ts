import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(), 
    NbButtonModule,
  ]
})
export class AdminModule { }
