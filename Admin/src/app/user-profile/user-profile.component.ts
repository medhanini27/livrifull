import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BaseUrl} from '../varglobale.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    Commandes = [];
    p: number = 1;

    constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<any>(BaseUrl +'/getallcommande').subscribe(data => {
          this.Commandes = data;

          })
  }

}
