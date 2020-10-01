import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';




import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CommandesComponent } from './Commandes/Commandes.component';
import { ResteaurantsComponent } from './Resteaurants/Resteaurants.component';
import {ClientsComponent} from './Clients/Clients.component';
import { IconsComponent } from './icons/icons.component';
import { loginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BanniereComponent } from './Banniere/Banniere.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LivreurComponent } from './livreur/livreur.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
      AppRoutingModule,
      HttpClientModule,
      NgxPaginationModule,
     
   
    NgbModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LivreurComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
