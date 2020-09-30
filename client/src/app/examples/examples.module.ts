import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';

import { SignupComponent } from './signup/signup.component';
import { NotifierModule } from "angular-notifier";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MatCardModule,
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: "middle",
                    distance: 12
                },
                vertical: {
                    position: "top",
                    distance: 12,
                    gap: 10
                }
            },
            theme: "material",
            behaviour: {
                autoHide: 5000,
                onClick: 'hide',
                onMouseover: "pauseAutoHide",
                showDismissButton: true,
                stacking: 4
            },
            animations: {
                enabled: true,
                show: {
                    preset: "slide",
                    speed: 30,
                    easing: "ease"
                },
                hide: {
                    preset: "fade",
                    speed: 30,
                    easing: "ease",
                    offset: 50
                },
                shift: {
                    speed: 30,
                    easing: "ease"
                },
                overlap: 150
            }
        })
    ],
    declarations: [
        SignupComponent,
   
        
    ]
})
export class ExamplesModule { }
