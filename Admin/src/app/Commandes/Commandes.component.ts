import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BaseUrl} from '../varglobale.service';

@Component({
    selector: 'app-Commandes',
  templateUrl: './Commandes.component.html',
  styleUrls: ['./Commandes.component.css']
})
export class CommandesComponent implements OnInit {
    Commandes = [];
    p: number = 1;

    constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<any>(BaseUrl +'/getallcommande').subscribe(data => {
          this.Commandes = data;

          })
  }

}
