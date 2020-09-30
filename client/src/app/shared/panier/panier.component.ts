import { Component, OnInit, ElementRef, NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CommanderService } from '../../commander.service';
import {  Router } from '@angular/router'; 

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
      
export class PanierComponent implements OnInit {
    public Menu = [];

    PrixCommande = 0;
    nbrtemp = 0;
    idtemp = 0;
    constructor(private resultListService: CommanderService, private router: Router) {
        //this.resultListService.resultList$
        //    .subscribe(resultList => {
        //        if (resultList != null) {
        //            this.Menu = this.Menu.filter(obj => obj.id != resultList[0].id);
        //            this.Menu.push(resultList[0]);
        //            console.log(resultList);
        //            console.log(this.Menu);

        //            setTimeout(function () {
        //                console.log(resultList[0].id);
        //                document.getElementById("nbrdeproduit" + resultList[0].id + "panier")["value"] = resultList[0].prixT / resultList[0].prix;;

        //            }, 1000);
        //            this.PrixCommande = 0;
        //            for (var i = 0; i < this.Menu.length; i++) {
                        
        //                this.PrixCommande = this.PrixCommande + this.Menu[i].prixT;

        //            }

        //        }
        //    });

        


    }

    ngOnInit(): void {

        
            this.getcommandes();     


  }
  onminusclicked(id) {
      if (parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id + "panier")).value) != 1) {
          this.PrixCommande = 0;
          document.getElementById("nbrdeproduit" + id + "panier")["value"] = parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id + "panier")).value) - 1;


          for (var i = 0; i < this.Menu.length; i++) {
              if (this.Menu[i].id == id) {
                  this.Menu[i].prixT = this.Menu[i].prix * parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id + "panier")).value);
              }
              this.PrixCommande = this.PrixCommande + this.Menu[i].prixT;
          }
      }
      else {
          var MenuTemp = [];
          for (var j = 0; j < this.Menu.length; j++) {
              if (this.Menu[j].id != id) {
                  console.log("l id ");

                  MenuTemp.push(this.Menu[j]);
              }
              else
              {
                  this.PrixCommande = this.PrixCommande - this.Menu[j].prix;
              }
          }
          this.Menu = MenuTemp;

      }
  }
  onplusclicked(id) {
      this.PrixCommande = 0;

      document.getElementById("nbrdeproduit" + id + "panier")["value"] = parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id + "panier")).value) + 1;
      console.log(document.getElementById("nbrdeproduit" + id + "panier"));
      for (var i = 0; i < this.Menu.length; i++) {
          if (this.Menu[i].id == id) {
              this.Menu[i].prixT = this.Menu[i].prix * parseInt((<HTMLInputElement>document.getElementById("nbrdeproduit" + id + "panier")).value);
          }
          this.PrixCommande = this.PrixCommande + this.Menu[i].prixT;

      }

  }
  onpayerclicked() {
      if (JSON.parse(sessionStorage.getItem('user')) != null)
      { this.router.navigate(['payement', { prix: this.PrixCommande  }]); }
      else
      { this.router.navigate(['signup']); }
  }  





  getcommandes() {
      if (JSON.parse(sessionStorage.getItem('Commande')) != null)
   { this.Menu = JSON.parse(sessionStorage.getItem('Commande'));}
      setTimeout(() => {
          
      this.PrixCommande = 0;

      for (var i = 0; i < this.Menu.length; i++) {

          
          document.getElementById("nbrdeproduit" + this.Menu[i].id + "panier")["value"] = this.Menu[i].nbr;
          

          this.PrixCommande = this.PrixCommande + this.Menu[i].prixT;
      }

      }, 1000);
  }


}
