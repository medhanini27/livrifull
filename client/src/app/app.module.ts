import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatCardModule} from '@angular/material/card';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider,
    AmazonLoginProvider,
} from 'angularx-social-login';

import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
//import { SidebarComponent } from './components/sidebar/sidebar.component';

//import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { PanierComponent } from './shared/panier/panier.component';
import { CommanderService } from './commander.service';
import { PayementComponent } from './payement/payement.component';
//import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
//import { LivreurComponent } from './livreur/livreur.component';
//import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { NotifierModule } from "angular-notifier";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
      PanierComponent,
      PayementComponent,
      HomeComponent,
      MenuComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ExamplesModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      MatDialogModule,
      BrowserAnimationsModule,
      MatCardModule,
      NgxUsefulSwiperModule,
      SocialLoginModule,
      MatProgressSpinnerModule,
      MatTabsModule,
      MatSlideToggleModule,
      ChartsModule,
      MatTooltipModule,
      NotifierModule,
      NgCircleProgressModule.forRoot({
          // set defaults here
          radius: 100,
          outerStrokeWidth: 16,
          innerStrokeWidth: 8,
          outerStrokeColor: "#78C000",
          innerStrokeColor: "#C7E596",
          animationDuration: 300,
      
    })
  ],
  providers: [
      {
          provide: 'SocialAuthServiceConfig',
          useValue: {
              autoLogin: false,
              providers: [
                  //{
                  //    id: GoogleLoginProvider.PROVIDER_ID,
                  //    provider: new GoogleLoginProvider("508034156252 - 0ap8qe76ie639ihvhfns5aghb2h59nb7.apps.googleusercontent.com"),
                  //},
                  {
                      id: FacebookLoginProvider.PROVIDER_ID,
                      provider: new FacebookLoginProvider('3295079867251634'),
                  },
                  
              ],
          } as SocialAuthServiceConfig,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
