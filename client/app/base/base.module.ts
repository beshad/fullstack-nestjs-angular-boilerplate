import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NavbarComponent } from '@app/base/components/navbar/navbar.component'
import { AppBootstrapModule } from './ngx-bootstrap/app-bootstrap.module'
import { NgMaterialModule } from './ng-material/app-material.module'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AuthModule } from '@app/auth/auth.module'

// nebular Security module 
import { RoleProvider } from '@app/base/role.provider'
import { of as observableOf } from 'rxjs/observable/of';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security'

import {
  NbUserModule
} from '@nebular/theme';


export function getRole() {
  return observableOf(['guest', 'user', 'admin'])
}

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    AppBootstrapModule,
    NgMaterialModule,
    FontAwesomeModule,
    NbUserModule,
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['home'],
        },
        user: {
          parent: 'guest',
          view: ['admin','user'],
        },
        admin: {
          parent: 'user',
          create: '*',
          remove: '*',
        },
      },
    }),
  ],
  exports: [
    NavbarComponent,
    AppBootstrapModule,
    NgMaterialModule,
    FontAwesomeModule,
    AuthModule,
  ],
  providers: [
    {
      provide: NbRoleProvider,
      useClass: RoleProvider,
      useValue: getRole
    }
  ]
})
export class BaseModule { }
