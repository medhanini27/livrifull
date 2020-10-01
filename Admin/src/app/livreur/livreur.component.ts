import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BaseUrl} from '../varglobale.service';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {

    Commandes = [];
    p: number = 1;
    usserrole: number;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.usserrole = JSON.parse(sessionStorage.getItem('user')).role;

        this.http.get<any>(BaseUrl +'/getallcommande').subscribe(data => {
             
            this.Commandes = data.sort((a, b) => { return +new Date(b.date) - +new Date(a.date) });
                   })
    }


    t(id,nbr)
    {

       const l = ["non traite", "en cours de preparation", "en livrison", "livre"];
       console.log("tbadel " + id + " " + nbr);
       document.getElementById("dropdownBasic" + id)["value"] = l[nbr];
       this.http.get(BaseUrl +'/updatecommande', { params: { id: id, etat: nbr } }).subscribe(data => { console.log(data); });
       


    }
}
