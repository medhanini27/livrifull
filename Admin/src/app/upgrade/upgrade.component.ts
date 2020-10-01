import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var $: any;
import {BaseUrl} from '../varglobale.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
    PromotionBanner = ["0", "0", "0", "0"];
    Restaurant = [];

    constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
          this.Restaurant = data;
          this.Restaurant.unshift({ id: 0, nom: "clicker ici pour choisir un resterant", img: "../../assets/img/collection-1.jpg" });
      })

      this.http.get<any>(BaseUrl +'/getallpromobanner').subscribe(data => {
          //this.PromotionBanner = data;
          console.log(data);
          for (var i = 1; i < 5; i++) {
              this.PromotionBanner[i - 1] = data[i - 1].idrest;

              if (data[i - 1].idrest == 0) {
                  document.getElementById("dropdownBanner" + i)["value"] = this.Restaurant[0].nom;
                  document.getElementById("imgBanner" + i)["src"] = this.Restaurant[0].img;
              }
              for (var j = 1; j < this.Restaurant.length; j++) {
                  
                  if (data[i - 1].idrest == this.Restaurant[j].id) {
                      document.getElementById("dropdownBanner" + i)["value"] = this.Restaurant[j].nom + " (clicker ici pour changer le resterant)";
                      document.getElementById("imgBanner" + i)["src"] = BaseUrl+"/uploads/" + this.Restaurant[j].img;

                  }
              }
          }




      });



  }
  SaveBannerPromotion() {



      this.http.get(BaseUrl +'/updatepromobanner', { params: { restid1: this.PromotionBanner[0], restid2: this.PromotionBanner[1], restid3: this.PromotionBanner[2], restid4: this.PromotionBanner[3] } }).subscribe(data => {
          if (data === "succes") {
              // Reset the file input
              this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Promotion resteaurants updated with succes');

          }
      });



  }
  onrestclick(nom: string, imgrest: string, idrest: string, div: string, id: number) {
      //console.log(g);

      if (idrest == "0") {
          document.getElementById("dropdown" + div)["value"] = this.Restaurant[0].nom;
          document.getElementById("img" + div)["src"] = this.Restaurant[0].img;
      }
      else {
          document.getElementById("dropdown" + div)["value"] = nom + " (clicker ici pour changer le resterant)";
          document.getElementById("img" + div)["src"] = BaseUrl + "/uploads/" + imgrest;
      }
      this.PromotionBanner[id - 1] = idrest;

  }

  showNotificationwithoutconfirmation(nbr, from, align, msg) {
      const type = ['', 'info', 'success', 'warning', 'danger'];

      const color = Math.floor((Math.random() * 4) + 1);
      const a = false;
      $.notify({
          icon: "notifications",
          message: msg

      }, {
              type: type[nbr],
              timer: 4000,
              placement: {
                  from: from,
                  align: align
              },
              template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +

              '</div>'
          });




  }






}
