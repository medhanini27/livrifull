import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BaseUrl} from '../varglobale.service';

@Component({
  selector: 'app-clients',
  templateUrl: './Clients.component.html',
  styleUrls: ['./Clients.component.css']
})
export class ClientsComponent implements OnInit {

    users = [];
    p: number = 1;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get<any>(BaseUrl +'/getalluser').subscribe(data => {
            this.users = data;

        })


        


    }

    onblock(event, id: string)
    {
        if (event.checked)
        {
            this.http.get(BaseUrl + '/banuser', { params: { id: id, role: "4" } }).subscribe(data => {
                console.log("banned");
            })
        }
        else {
            this.http.get(BaseUrl + '/banuser', { params: { id: id, role: "2" } }).subscribe(data => {
                console.log("unbanned");
            })
        }

    }



  

}
