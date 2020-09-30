import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {Router}from"@angular/router"
import { HttpClient, HttpParams } from '@angular/common/http';
import {BaseUrl} from '../../hero.service';
import { NotifierService } from "angular-notifier";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;





    constructor(private notifierService: NotifierService, private http: HttpClient, private authService: SocialAuthService, private router: Router) {


    }

    signInWithGoogle(): void {
        //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
            sessionStorage.setItem("user", JSON.stringify(user));


            this.http.get<any>(BaseUrl + '/getuser', { params: { email: user.email } }).subscribe(data => {
                if (data.length = 0)
                {

                    document.getElementById("nomuser")["value"] = user.lastName;
                    document.getElementById("prenomuser")["value"] = user.firstName;
                    document.getElementById("emailuser")["value"] = user.email;
                    document.getElementById("passworduser")["value"] = "facebook user";

                    this.signupclicked();
                }
            });






            setTimeout(() => {
                this.router.navigate(['/home']);
                
            }, 500);


        });
    }

    signOut(): void {
        this.authService.signOut();
        sessionStorage.removeItem("user");
        setTimeout(() => {
            this.router.navigate(['/home']);

        }, 500);

    }


   



    ngOnInit() { }

    gotosignupclicked() {

        document.getElementById("namediv")["hidden"] = false;
        document.getElementById("prenomdiv")["hidden"] = false;
        document.getElementById("signupbtn")["hidden"] = false;
        document.getElementById("signinbtn")["hidden"] = true;
        document.getElementById("gotosignup")["hidden"] = true;
        document.getElementById("gotosignin")["hidden"] = false;


    }
    gotosigninclicked() {

        document.getElementById("namediv")["hidden"] = true;
        document.getElementById("prenomdiv")["hidden"] = true;
        document.getElementById("signupbtn")["hidden"] = true;
        document.getElementById("signinbtn")["hidden"] = false;
        document.getElementById("gotosignin")["hidden"] = true;
        document.getElementById("gotosignup")["hidden"] = false;


    }

    signupclicked()
    {
        const nom = document.getElementById("nomuser")["value"];
        const prenom = document.getElementById("prenomuser")["value"];
        const email = document.getElementById("emailuser")["value"];
        const password = document.getElementById("passworduser")["value"];
        this.http.get<any>(BaseUrl+'/getuser', { params: { email: email } }).subscribe(data => {
            if (data.length != 0)
            {
                this.notifierService.show({
                    type: "warning",
                    message: "email already exicte please sign in",

                });
            }
            else {
                this.http.get(BaseUrl+'/adduser', { params: { name: nom, prenom: prenom, email: email, password: password } }).subscribe(data => {
                    if (data == "succes")
                    {
                        //alert("user added");
                        this.signinclicked();
                    }



                });



            }


            




        })














    }




    signinclicked()
    {

        const email = document.getElementById("emailuser")["value"];
        const password = document.getElementById("passworduser")["value"];
        this.http.get<any>(BaseUrl + '/getuser', { params: { email: email } }).subscribe(data => {
            if (data.length == 0) {
                this.notifierService.show({
                    type: "warning",
                    message: "email does not exist please sign up",

                });
                this.gotosignupclicked();

            }
            else {
                if (password == data[0].password) {
                    if (data[0].role == 2) {
                        const user1 = {
                            firstName: data[0].prenom, id: data[0].id, photoUrl: BaseUrl + "/uploads/user.png"
                        }

                        sessionStorage.setItem("user", JSON.stringify(user1));
                        setTimeout(() => {
                            this.router.navigate(['/home']);

                        }, 500);
                    }
                    else if (data[0].role == 2)
                    {
                        this.notifierService.show({
                            type: "error",
                            message: "votre compte a ete bloque",

                        });
                    }


                }
                else {

                    this.notifierService.show({
                        type: "error",
                        message: "mot de passe incorrect",

                    });


                }


            }
        })

    }
















}
