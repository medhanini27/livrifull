import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CommandesComponent } from '../../Commandes/Commandes.component';
import { ResteaurantsComponent } from '../../Resteaurants/Resteaurants.component';
import { ClientsComponent } from '../../Clients/Clients.component';
import { IconsComponent } from '../../icons/icons.component';
import { loginComponent } from '../../login/login.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { BanniereComponent } from '../../Banniere/Banniere.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
      MatTooltipModule,
      NgxPaginationModule,
      MatSlideToggleModule
  ],
  declarations: [
    DashboardComponent,
      CommandesComponent,
      ResteaurantsComponent,
      ClientsComponent,
    IconsComponent,
      loginComponent,
    NotificationsComponent,
      BanniereComponent,
  ]
})

export class AdminLayoutModule {}
