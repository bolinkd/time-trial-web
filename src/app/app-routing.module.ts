import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppShellComponent} from './components/app-shell/app-shell.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {LogoutComponent} from './components/logout/logout.component';

const routes: Routes = [
  { path: '', component: AppShellComponent, children: [
      { path: '', canActivate: [AuthGuard], redirectTo: 'rentals', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'time-trial', loadChildren: () => import('./time-trial/time-trial.module').then(m => m.TimeTrialModule) },
      { path: 'rentals', loadChildren: () => import('./rental/rental.module').then(m => m.RentalModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
