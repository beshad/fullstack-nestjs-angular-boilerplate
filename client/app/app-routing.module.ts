import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from '@app/home/home.component'
import { AdminComponent } from '@app/admin/admin.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'home' },
    pathMatch: 'full'
  },
  {
    path: 'admin',
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
