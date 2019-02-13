
import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', loadChildren: './public/accueil/accueil.module#AccueilPageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  {
    path: 'members',
    canActivate: [AuthGuardService],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
  // { path: 'accueil', loadChildren: './public/accueil/accueil.module#AccueilPageModule' },
  // { path: 'objectif', loadChildren: './public/objectif/objectif.module#ObjectifPageModule' },
  // { path: 'demarrage', loadChildren: './public/demarrage/demarrage.module#DemarragePageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
