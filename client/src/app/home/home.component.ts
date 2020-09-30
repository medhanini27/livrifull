import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SwiperOptions, Autoplay, Swiper } from 'swiper';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {Router}from"@angular/router"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {    BaseUrl} from '../hero.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    Restaurant = [];
    RestaurantS = [];
    number = [];
    Category = [];
    Restnbr: number;
    user = [];
    PromotionBanner = ["0", "0", "0", "0"];
    RestSearch = [];
    userimg: "";

    config: SwiperOptions = {
       
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }, effect: 'slide',
        loop: true
    };

    configfooter: SwiperOptions = {

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }, effect: 'slide',
        slidesPerView: 6.5,
        loop: true
    };









    constructor(private http: HttpClient, private authService: SocialAuthService, private router: Router ) {
 this.http.get<any>(BaseUrl+'/getallrestaurants').subscribe(data => {
     this.Restaurant = data;
     this.RestaurantS = this.Restaurant.filter(a=>a.onhome==1);
     if (this.RestaurantS.length % 6 != 0) this.Restnbr = (this.RestaurantS.length / 6) + 1;
     else this.Restnbr = (this.RestaurantS.length / 6);
        })
 this.getcategory();

 Swiper.use([Autoplay]);
        



    }

    ngOnInit(): void {
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


        this.http.get<any>(BaseUrl+'/getallpromobanner').subscribe(data => {
            //this.PromotionBanner = data;
            for (var i = 1; i < 5; i++) {
                this.PromotionBanner[i - 1] = data[i - 1].idrest;
                for (var j = 0; j < this.Restaurant.length; j++) {
                    if (data[i - 1].idrest == this.Restaurant[j].id) {
                        //document.getElementById("dropdownBanner" + i)["value"] = this.Restaurant[j].nom;
                        document.getElementById("adtext" + i)["hidden"] = true;
                        document.getElementById("div" + (i - 1))["hidden"] = false;
                        document.getElementById("imgBanner" + i)["src"] = BaseUrl+"/uploads/" + this.Restaurant[j].img;


                    }
                }
            }




        }); 

      
        
  }


  getcategory() {
      this.http.get<any>(BaseUrl+'/getallcategory').subscribe(data => {
          for (var i = 0; i < data.length; i++) {
           
              this.Category.push({ id: data[i].id, name: data[i].Nom, ids: data[i].ids.split(',') });

          }
      });

    }



  onsearch()
  {
      this.RestSearch = this.Restaurant.filter(a => a.nom.toLowerCase().includes((document.getElementById("searchbar")["value"]).toLowerCase()));

      
  }

  oncategoryclick1(type: string) {
      this.RestaurantS = [];
      for (var i = 0; i < this.Category.length; i++) {

          if (this.Category[i].name == type) {

              for (var j = 0; j < this.Category[i].ids.length; j++) {
                  for (var z = 0; z < this.Restaurant.length; z++) {
                      if (this.Restaurant[z].id == this.Category[i].ids[j]) {
                          this.RestaurantS.push(this.Restaurant[z]);
                      }
                  }
              }
          }

          //var yourbuttons = document.getElementsByName('cattt');
          //for (var i = yourbuttons.length - 1; i >= 0; i--) {
          //    if (yourbuttons[i]["active"]) {
          //        yourbuttons[i].classList.add("highlight");
          //    }
          //    else {
          //        yourbuttons[i].classList.remove("highlight");}
              
          //};


      }

      if (this.RestaurantS.length % 6 != 0) this.Restnbr = (this.RestaurantS.length / 6) + 1;
      else this.Restnbr = (this.RestaurantS.length / 6);
      document.getElementById("restliste").scrollIntoView()

      
  }
    

  gotosignup() {

  }


    signOut(): void {
        this.authService.signOut();
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("Commande");
        location.reload();


        setTimeout(() => {
            location.reload();
        }, 500);

    }


    gotomenufromad(nb: number)
    {
        if (this.PromotionBanner[nb] != "0")
        {
            this.router.navigate(['menu', { id: this.PromotionBanner[nb]}]);
        }

    }


    seeallresteaurant()
    {
        this.RestaurantS = this.Restaurant;
        document.getElementById("restliste").scrollIntoView()

    }

}
