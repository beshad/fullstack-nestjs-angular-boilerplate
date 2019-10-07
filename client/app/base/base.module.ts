import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppBootstrapModule } from './ngx-bootstrap/app-bootstrap.module';
import { NgMaterialModule } from './ng-material/app-material.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppBootstrapModule,
    NgMaterialModule,
  ],
  exports: [
    NavbarComponent,
    AppBootstrapModule,
    NgMaterialModule,
  ]
})
export class BaseModule { }
