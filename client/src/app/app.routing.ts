import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//import { ComponentsComponent } from './components/components.component';
//import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
//import { LandingComponent } from './examples/landing/landing.component';
//import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { PayementComponent } from './payement/payement.component';
//import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
//import { LivreurComponent } from './livreur/livreur.component';
//import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home',             component: ComponentsComponent },
    //{ path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    //{ path: 'landing',          component: LandingComponent },
    //{ path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'payement', component: PayementComponent },
    //{ path: 'admin', component: AdminComponent },
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent },
    //{ path: 'livreur', component: LivreurComponent },
    //{ path: 'admin1', component: AdmindashboardComponent }


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
