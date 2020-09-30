import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SwiperOptions, Autoplay, Swiper } from 'swiper';
import { CommanderService } from '../commander.service';
import {PanierComponent} from "../shared/panier/panier.component";
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {    BaseUrl} from '../hero.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    Restaurants = [];
    Resteaurent = [];
    @ViewChild(PanierComponent) panier: PanierComponent;
    Menu = [];
    Commande = [];
    user = [];
    userimg = "";
    configfooter: SwiperOptions = {

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }, effect: 'slide',
        slidesPerView: 6.5,
        loop: true
    };

    id: number;
    constructor(private authService: SocialAuthService,private route: ActivatedRoute, private http: HttpClient, private resultListService: CommanderService ) {
        Swiper.use([Autoplay]);

        }

    ngOnInit(): void {
        document.getElementById("menu").scrollIntoView()
        this.route.queryParams
            .filter(params => params.id)
            .subscribe(params => {
                
                this.id = params.id; 

            });
        if (this.id == null) { this.id = parseInt( this.route.snapshot.paramMap.get('id')); }

        this.http.get<any>(BaseUrl+'/getallrestaurants').subscribe(data => {
            this.Restaurants = data;
            for (var z = 0; z < this.Restaurants.length; z++) {
                if (this.Restaurants[z].id == this.id) {
                    this.Resteaurent.push(this.Restaurants[z]);
                }
            }
        })

       
        this.http.get<any>(BaseUrl+'/getmenu', { params: { id: this.id.toString() } }).subscribe(data => {
            this.Menu = data;



        });

        if (JSON.parse(sessionStorage.getItem('Commande')) != null)
        {this.Commande = JSON.parse(sessionStorage.getItem('Commande')); }

        if (JSON.parse(sessionStorage.getItem('user')) == null) {
            document.getElementById("signindiv")["hidden"] = false;
            document.getElementById("usercart")["hidden"] = true;

        }
        else {
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.userimg = this.user["photoUrl"];

            document.getElementById("signindiv")["hidden"] = true;
            document.getElementById("usercart")["hidden"] = false;
        }




  }

    onminusclicked(id) {
        if (parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id)).value) != 0) {
            document.getElementById("nbrdeproduit" + id)["value"] = parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id)).value) - 1;
        }
    }
    onplusclicked(id) {
        document.getElementById("nbrdeproduit" + id)["value"] = parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id)).value) + 1;

    }

    oncommanderclicked(id) {
        //document.getElementById("nbrdeproduit" + id)["value"]

        if (this.Commande != null)
        { this.Commande = this.Commande.filter(a => a.id != id); }

        for (var i = 0; i < this.Menu.length; i++) {
            if (this.Menu[i].id == id) {
                this.Commande.push({ id: this.Menu[i].id, nom: this.Menu[i].nom, prix: this.Menu[i].prix, prixT: parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id)).value) * this.Menu[i].prix, nbr: parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id)).value), idrest: this.Menu[i].restid});

            }
        }

        sessionStorage.setItem('Commande', JSON.stringify(this.Commande));
        this.panier.getcommandes();

    }
    signOut(): void {
        this.authService.signOut();
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("Commande");
        location.reload();


        setTimeout(() => {
            location.reload();
        }, 1000);

    }

}
