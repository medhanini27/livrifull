import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {    BaseUrl} from '../hero.service';
import { NotifierService } from "angular-notifier";
import { SwiperOptions, Autoplay, Swiper } from 'swiper';

import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {
    prix=0;
    Prixtotale = 0;
    livraison = 7;
    Commandeapayer = [];
    user = [];
    Restaurants = [];
    userimg = "";
    configfooter: SwiperOptions = {

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }, effect: 'slide',
        slidesPerView: 6.5,
        loop: true
    };

    constructor(private notifierService: NotifierService,private route: ActivatedRoute, private http: HttpClient, private router: Router ) {
        //this.route.queryParams
        //    .filter(params => params.prix)
        //    .subscribe(params => {

        //        this.prix = params.prix;

        //    });

        Swiper.use([Autoplay]);

        this.prix = parseInt( this.route.snapshot.paramMap.get('prix'));




        this.Prixtotale = this.prix * 1 + 7;
        this.Commandeapayer = JSON.parse(sessionStorage.getItem('Commande'));


    }

    ngOnInit(): void {
        document.getElementById("paye").scrollIntoView()

        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.userimg = this.user["photoUrl"];

        this.http.get<any>(BaseUrl+'/getallrestaurants').subscribe(data => {
            this.Restaurants = data;

        });
         

  }
    passercommande() {

        const address = (document.getElementById("autocomplete")["value"]) + (document.getElementById("inputCity")["value"]) + (document.getElementById("inputState")["value"]) + (document.getElementById("inputZip")["value"]) + (document.getElementById("inputCounty")["value"]) + (document.getElementById("inputphone")["value"]);
        const usersender = this.user["name"];


        var C = this.Commandeapayer[0].nbr + " " + this.Commandeapayer[0].nom + " " + this.Commandeapayer[0].prixT + " " + this.Restaurants.filter(a => a.id == this.Commandeapayer[0].idrest)[0].nom+" ";
        for (var i = 1; i < this.Commandeapayer.length; i++) {
            C = C + "," + this.Commandeapayer[i].nbr + " " + this.Commandeapayer[i].nom + " " + this.Commandeapayer[i].prixT + " " + this.Restaurants.filter(a => a.id == this.Commandeapayer[i].idrest)[0].nom + " ";


        }


        this.http.get(BaseUrl+'/addcommande', { params: { commande: C, user: usersender,userid:this.user["id"], address: address } }).subscribe(data => {
            sessionStorage.removeItem('Commande');

            this.notifierService.show({
                type: "success",
                message: 'Commande passer avec succes',

            });

            setTimeout(() => {
                this.router.navigate(['/home']);

            }, 1000);
        })


    }
}
