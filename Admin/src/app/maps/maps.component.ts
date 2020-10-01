import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BaseUrl} from '../varglobale.service';
import {Router}from"@angular/router"



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    test: Date = new Date();

    constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

  }
  signinclicked()
  {


      const email = document.getElementById("emailuser")["value"];
      const password = document.getElementById("passworduser")["value"];

      this.http.get<any>(BaseUrl + '/getuser', { params: { email: email } }).subscribe(data => {
          if (data.length == 0) {
             
              alert("verifier vous parametre");

          }
          else {
              if (password == data[0].password) {
                  if (data[0].role == 0) {
                      const user1 = {
                          firstName: data[0].prenom, id: data[0].id, role:0
                      }

                      sessionStorage.setItem("user", JSON.stringify(user1));
                      setTimeout(() => {
                          this.router.navigate(['']);

                      }, 500);
                  }
                  else if (data[0].role == 3) {
                      const user1 = {
                          firstName: data[0].prenom, id: data[0].id, role: 3
                      }
                      sessionStorage.setItem("user", JSON.stringify(user1));

                      setTimeout(() => {
                          this.router.navigate(['/livreur']);

                      }, 500);
                    
                  }


              }
              else {

                 
                  alert("verifier vous parametre");

               


              }


          }
      })

  }
}
