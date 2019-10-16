import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '@app/home/home.component'
import { AdminComponent } from '@app/admin/admin.component'

import { AuthGuard } from '@app/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: { animation: 'home' },
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { animation: 'admin' },
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false } // true for debugging purposes, otherwise false
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
