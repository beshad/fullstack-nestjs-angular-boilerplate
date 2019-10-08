import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@app/base/components/navbar/navbar.component';
import { AppBootstrapModule } from './ngx-bootstrap/app-bootstrap.module';
import { NgMaterialModule } from './ng-material/app-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppBootstrapModule,
    NgMaterialModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    AppBootstrapModule,
    NgMaterialModule,
    FontAwesomeModule
  ]
})
export class BaseModule { }
