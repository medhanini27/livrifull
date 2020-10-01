import { Component, OnInit, ViewChild, ElementRef, Inject, ViewContainerRef, TemplateRef, ViewRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $: any;
import {BaseUrl} from '../varglobale.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
    @ViewChild('UploadFileInput', { static: false })
    public mg: string;
    uploadFileInput: ElementRef;
    fileUploadForm: FormGroup;
    fileInputLabel: string;
    filetemp: File;
    reader = new FileReader();
    haseditimg = false;
    haseditMenuimg = false;
    editrestid: number;
    Menueditid: number;
    editrestnom: string;
    editrestimg: string;
    Category = [];
    imageedit: string;
    Menuimageedit: string;
    haschosengouvernemant = false;
    haschosenadreess = false;
    btn1 = "Choisir votre gouvernemant";
    btn2 = "choisir votre zone";
    gouvernemant = [];
    Bizerte = ["Bizerte Nord", "Bizerte Sud", "Djoumine", "El Alia", "Ghar El Melh", "Ghezala", "Mateur", "Menzel Bourguiba", "Menzel Jemil", "Ras Jabel", "Sejenane", "Tinja", "Utique", "Zarzouna"];
    Tunis = ["Ariana", "manezah", "Ben Arous", "Manouba"];
    Sousse = ["Sousse", "Ksibet Thrayet", "Ezzouhour", "Zaouiet Sousse", "Hammam Sousse", "Akouda", "Kalâa Kebira", "Sidi Bou Ali", "Hergla", "Enfidha", "Bouficha", "Sidi El Hani", "M'saken", "Kalâa Seghira", "Messaadine", "Kondar"];
    Restaurant = [];
    Menu = [];
    PromotionBanner = ["0", "0", "0", "0"];
    isChecked = true;
    public nbrresteaurants = 0;
 


    p: number = 1;
    constructor(private formBuilder: FormBuilder,private http: HttpClient) {

    }

    ngOnInit() {
        this.mg = BaseUrl;
      this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
          this.Restaurant = data;
          this.nbrresteaurants = data.length
      })
      this.fileUploadForm = this.formBuilder.group({
          uploadedImage: [''],
      });

      this.getcategory();
      
  }

  ongouvernemantclick(g: string) {
      this.haschosengouvernemant = false;

      this.haschosengouvernemant = true;
      if (g == "Bizerte")
      { this.gouvernemant = this.Bizerte; }
      else if (g == "Tunis")
      { this.gouvernemant = this.Tunis; }
      else if (g == "Sousse")
      { this.gouvernemant = this.Sousse; }
      this.btn1 = g;
      this.btn2 = "choisir votre zone";

  }

  onzoneclick(a: string) {
      this.btn2 = a;
      this.haschosenadreess = true;

  }


  onFileSelect(event) {
      const file = event.target.files[0];
      this.fileInputLabel = file.name;
      this.fileUploadForm.get('uploadedImage').setValue(file);
  }

  onEditFileSelect(event) {
      this.haseditimg = true;
      const editfile = event.target.files[0];
      this.fileInputLabel = editfile.name;
      this.fileUploadForm.get('uploadedImage').setValue(editfile);
      this.reader.onload = function (e) {
          document.getElementById("editlogo")["src"] = e.target.result;

      }
      this.reader.readAsDataURL(editfile);


  }



  onMenuEditFileSelect(event) {
      this.haseditMenuimg = true;
      const editfile = event.target.files[0];
      this.fileInputLabel = editfile.name;
      this.fileUploadForm.get('uploadedImage').setValue(editfile);
      this.reader.onload = function (e) {
          document.getElementById("Menueditlogo")["src"] = e.target.result;

      }
      this.reader.readAsDataURL(editfile);


  }
  onMenuFileSelect(event) {
      this.haseditMenuimg = true;
      const editfile = event.target.files[0];
      //this.fileInputLabel = editfile.name;
      this.fileUploadForm.get('uploadedImage').setValue(editfile);
      this.reader.onload = function (e) {
          document.getElementById("editlogo")["src"] = e.target.result;

      }
      this.reader.readAsDataURL(editfile);


  }



  onFormSubmit() {

      if (!this.fileUploadForm.get('uploadedImage').value) {
          this.showNotificationwithoutconfirmation(3, 'top', 'center', 'choisir votre logo');
          return false;
      }

      const formData = new FormData();
      formData.append('upload', this.fileUploadForm.get('uploadedImage').value);
      formData.append('name', document.getElementById("name")["value"]);
      formData.append('localisation', this.btn2);
      formData.append('description', document.getElementById("description")["value"]);


      this.http
          .post<any>(BaseUrl +'/upload', formData).subscribe(response => {
              console.log("hethi heya rep "+response);
              if (response === "succes") {
                  // Reset the file input
                 // this.uploadFileInput.nativeElement.value = "";
                  this.fileInputLabel = undefined;
                  this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Resteaurant added');

                  this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
                      this.Restaurant = data;
                      for (var j = 0; j < this.Category.length; j++) {
                          if ((<HTMLInputElement>document.getElementById(this.Category[j].name + 'checkbox')).checked == true) {
                              this.Category[j].ids.push(data[data.length - 1].id);
                              this.http.get(BaseUrl +'/updatecategory', { params: { id: this.Category[j].id, ids: this.Category[j].ids.toString() } }).subscribe(data => console.log("after update  " + data));

                          }

                      }




                  });



              }
          }, er => {
              console.log(er);
          });

  }

  oneditclick(id: number, nom: string, description: string, address: string, img: string) {

      document.getElementById("divrest")["hidden"] = false;

      document.getElementById("divrest").scrollIntoView();

      this.haschosengouvernemant = false;
      this.editrestid = id;

      for (var j = 0; j < this.Category.length; j++) {
          for (var z = 0; z < this.Category[j].ids.length; z++) {
              if (id == this.Category[j].ids[z]) {
                  (<HTMLInputElement>document.getElementById(this.Category[j].name + 'checkbox')).checked = true;
                  break;
              }
              else {
                  (<HTMLInputElement>document.getElementById(this.Category[j].name + 'checkbox')).checked = false;

              }
          }

      }


      document.getElementById("fileuplaoddiv")["hidden"] = true;
      document.getElementById("imagetext")["hidden"] = true;

      document.getElementById("titletext").innerText = "Edit Restaurant";

      this.imageedit = img;
      document.getElementById("imageeditdiv")["hidden"] = false;
      document.getElementById("editbuttons")["hidden"] = false;


      document.getElementById("description")["value"] = description;

      document.getElementById("name")["value"] = nom;
      for (var i = 0; i < this.Bizerte.length; i++) {
          if (this.Bizerte[i] == address) {
              this.btn1 = "Bizzerte";
              this.haschosengouvernemant = true;
              this.gouvernemant = this.Bizerte;
              break;
          }
      }
      if (this.haschosengouvernemant == false) {

          for (var i = 0; i < this.Tunis.length; i++) {
              if (this.Tunis[i] == address) {
                  this.btn1 = "Grand Tunis";
                  this.haschosengouvernemant = true;
                  this.gouvernemant = this.Tunis;
                  break;
              }
          }


      }
      if (this.haschosengouvernemant == false) {

          for (var i = 0; i < this.Sousse.length; i++) {
              if (this.Sousse[i] == address) {
                  this.btn1 = "Sousse";
                  this.haschosengouvernemant = true;
                  this.gouvernemant = this.Sousse;
                  break;
              }
          }


      }
      else {

          this.btn2 = address;
      }
  }

  ondeleteclick(id: string) {

      this.showNotificationwithconfirmation(4, 'top', 'center', 'Vous ete sur de vouloir supprimer ce resteaurant ?');


      document.getElementById('ok').onclick = () =>  {


          this.http.get(BaseUrl +'/deleterestaurant', { params: { id: id } }).subscribe(data => {


              if (data == "deleted") {
                  this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Resteaurant deleted');
                  

                  this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
                      this.Restaurant = data;
                      for (var j = 0; j < this.Category.length; j++) {
                          this.Category[j].ids = this.Category[j].ids.filter(a => a != id);
                          this.http.get(BaseUrl +'/updatecategory', { params: { id: this.Category[j].id, ids: this.Category[j].ids.toString() } });


                      };




                  })


              }
          })


      }



  }


  onsaveeditclik() {
      if (this.haseditimg) {
          const formData = new FormData();
          formData.append('upload', this.fileUploadForm.get('uploadedImage').value);
          formData.append('name', document.getElementById("name")["value"]);
          formData.append('localisation', this.btn2);
          formData.append('id', this.editrestid.toString());

          formData.append('description', document.getElementById("description")["value"]);


          this.http
              .post<any>(BaseUrl +'/editwithimg', formData).subscribe(response => {
                  console.log(response);
                  if (response === "succes") {
                      // Reset the file input
                      this.uploadFileInput.nativeElement.value = "";
                      this.fileInputLabel = undefined;
                      this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Resteaurant edit done');

                      this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
                          this.Restaurant = data;

                          for (var j = 0; j < this.Category.length; j++) {
                              this.Category[j].ids = this.Category[j].ids.filter(a => a != this.editrestid.toString());

                              this.http.get(BaseUrl +'/updatecategory', { params: { id: this.Category[j].id, ids: this.Category[j].ids.toString() } }).subscribe(data => console.log("after update  " + data));
                              if ((<HTMLInputElement>document.getElementById(this.Category[j].name + 'checkbox')).checked == true) {

                                  this.Category[j].ids.push(this.editrestid.toString());
                                  this.http.get(BaseUrl +'/updatecategory', { params: { id: this.Category[j].id, ids: this.Category[j].ids.toString() } }).subscribe(data => console.log("after update  " + data));


                              }


                          }
                          console.log(this.Category);




                      });



                  }
              }, er => {
                  console.log(er);
              });




      }
      else {



          this.http
              .get<any>(BaseUrl +'/editwithoutimg', { params: { id: this.editrestid.toString(), name: document.getElementById("name")["value"], description: document.getElementById("description")["value"], localisation: this.btn2 } }).subscribe(response => {
                  console.log(response);
                  if (response === "succes") {
                      // Reset the file input
                      this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Resteaurant edit done');

                      this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
                          this.Restaurant = data;

                          for (var j = 0; j < this.Category.length; j++) {
                              this.Category[j].ids = this.Category[j].ids.filter(a => a != this.editrestid.toString());

                              this.http.get(BaseUrl +'/updatecategory', { params: { id: this.Category[j].id, ids: this.Category[j].ids.toString() } }).subscribe(data => console.log("after update  " + data));
                              if ((<HTMLInputElement>document.getElementById(this.Category[j].name + 'checkbox')).checked == true) {

                                  this.Category[j].ids.push(this.editrestid.toString());
                                  this.http.get(BaseUrl +'/updatecategory', { params: { id: this.Category[j].id, ids: this.Category[j].ids.toString() } }).subscribe(data => console.log("after update  " + data));


                              }


                          }




                      });



                  }
              }, er => {
                  console.log(er);
              });










      }
  }
  oncanceleditclik() {
      document.getElementById("divrest")["hidden"] = true;
      document.getElementById("restable").scrollIntoView();

      document.getElementById("titletext").innerText = "Add Restaurant";

      document.getElementById("imageeditdiv")["hidden"] = true;
      document.getElementById("editbuttons")["hidden"] = true;
      document.getElementById("fileuplaoddiv")["hidden"] = false;


      document.getElementById("description")["value"] = "";

      document.getElementById("name")["value"] = "";


  }

  getcategory() {
      this.http.get<any>(BaseUrl +'/getallcategory').subscribe(data => {
          for (var i = 0; i < data.length; i++) {
              //console.log(data[i].Nom);
              // this[data[i].Nom] = data[i].ids.split(',');

              // console.log(this[data[i].Nom]);
              this.Category.push({ id: data[i].id, name: data[i].Nom, ids: data[i].ids.split(',') });

          }
      });

  }


  onmenuclik(restid: number, nom: string, img: string) {
      this.editrestid = restid;
      this.editrestnom = nom;
      this.editrestimg = img;

      //document.getElementById("addproddiv")["hidden"] = false;
      document.getElementById("prodtable")["hidden"] = false;


      document.getElementById("restable")["hidden"] = true;

      document.getElementById("divrest")["hidden"] = true;
      this.http.get<any>(BaseUrl +'/getmenu', { params: { id: this.editrestid.toString() } }).subscribe(data => {
          this.Menu = data;



      });

  }
  onaddrest()
  {
      document.getElementById("divrest")["hidden"] = false;

      document.getElementById("divrest").scrollIntoView();
      document.getElementById("titletext").innerText = "Add Restaurant";

      document.getElementById("imageeditdiv")["hidden"] = true;
      document.getElementById("editbuttons")["hidden"] = true;
      document.getElementById("fileuplaoddiv")["hidden"] = false;


      document.getElementById("description")["value"] = "";

      document.getElementById("name")["value"] = "";


  }
  onreturnclick() {
      //document.getElementById("addproddiv")["hidden"] = true;
      document.getElementById("prodtable")["hidden"] = true;

      document.getElementById("restable")["hidden"] = false;

      document.getElementById("divrest")["hidden"] = true;


  }


  onMenuFormSubmit() {

      if (!this.fileUploadForm.get('uploadedImage').value) {
          this.showNotificationwithoutconfirmation(3, 'top', 'center', 'Choisir une image s il vous plais');

          return false;
      }

      const formData = new FormData();
      formData.append('upload', this.fileUploadForm.get('uploadedImage').value);
      formData.append('name', document.getElementById("nameprod")["value"]);
      formData.append('idrest', this.editrestid.toString());
      formData.append('description', document.getElementById("descriptionprod")["value"]);
      formData.append('prix', document.getElementById("prix")["value"]);


      this.http
          .post<any>(BaseUrl +'/uploadproduct', formData).subscribe(response => {
              console.log(response);
              if (response === "succes") {
                  // Reset the file input
                  //this.uploadFileInput.nativeElement.value = "";
                  //this.fileInputLabel = undefined;
                  this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Product added');

                  this.http.get<any>(BaseUrl +'/getmenu', { params: { id: this.editrestid.toString() } }).subscribe(data => {
                      this.Menu = data;





                  });



              }
          }, er => {
              console.log(er);
          });

  }








  oneditMenuclick(id: number, nom: string, description: string, prix: string, img: string) {
      document.getElementById("addproddiv")["hidden"] = false;
      document.getElementById("addproddiv").scrollIntoView();

      document.getElementById("nameprod")["value"] = nom;
      document.getElementById("prix")["value"] = prix;
      document.getElementById("descriptionprod")["value"] = description;
      document.getElementById("prix")["value"] = prix;
      this.Menuimageedit = img;
      this.Menueditid = id;
      document.getElementById("Menufileuplaoddiv")["hidden"] = true;

      document.getElementById("Menuimageeditdiv")["hidden"] = false;

      document.getElementById("Menueditbuttons")["hidden"] = false;

  }





  onMenusaveeditclik() {
      console.log('prix ' + document.getElementById("prix")["value"]);
      if (this.haseditMenuimg) {
          const formData = new FormData();
          formData.append('upload', this.fileUploadForm.get('uploadedImage').value);
          formData.append('name', document.getElementById("nameprod")["value"]);
          formData.append('id', this.Menueditid.toString());

          formData.append('description', document.getElementById("descriptionprod")["value"]);
          formData.append('prix', document.getElementById("prix")["value"]);


          this.http
              .post<any>(BaseUrl +'/editMenuwithimg', formData).subscribe(response => {
                  console.log(response);
                  if (response === "succes") {
                      // Reset the file input
                      //this.uploadFileInput.nativeElement.value = "";
                      //this.fileInputLabel = undefined;
                      this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Product edit done');

                      this.http.get<any>(BaseUrl +'/getmenu', { params: { id: this.editrestid.toString() } }).subscribe(data => {
                          this.Menu = data;





                      });



                  }
              }, er => {
                  console.log(er);
              });




      }
      else {



          this.http
              .get<any>(BaseUrl +'/editMenuwithoutimg', { params: { id: this.Menueditid.toString(), name: document.getElementById("nameprod")["value"], description: document.getElementById("descriptionprod")["value"], prix: document.getElementById("prix")["value"] } }).subscribe(response => {
                  console.log(response);
                  if (response === "succes") {
                      // Reset the file input
                      this.showNotificationwithoutconfirmation(2, 'top', 'center', 'Product edit done');

                      this.http.get<any>(BaseUrl +'/getmenu', { params: { id: this.editrestid.toString() } }).subscribe(data => {
                          this.Menu = data;





                      });



                  }
              }, er => {
                  console.log(er);
              });










      }
  }



  ondeleteMenuclick(id: string) {

     

      this.showNotificationwithconfirmation(4, 'top', 'center', 'Vous ete sur de vouloir supprimer ce produit ?');


      document.getElementById('ok').onclick = () =>{


          this.http.get(BaseUrl +'/deleteProduct', { params: { id: id } }).subscribe(data => {


              if (data == "deleted") {
                  this.showNotificationwithoutconfirmation(2,'top', 'center', 'Produit supprimer');

                  this.http.get<any>(BaseUrl +'/getmenu', { params: { id: this.editrestid.toString() } }).subscribe(data => {
                      this.Menu = data;





                  });


              }
          })


      }



  }
  onhomesetting(event, id: string) {
      console.log("check tbedel");
      console.log(event.checked);
      if (event.checked) {
          this.http.get(BaseUrl +'/updaterestauranthome', { params: { onhome: "1", id: id } }).subscribe(data => {
              if (data == "succes") {
                  this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
                      this.Restaurant = data;
                  });
              }
          });
      }
      else {
          this.http.get(BaseUrl +'/updaterestauranthome', { params: { onhome: "0", id: id } }).subscribe(data => {
              if (data == "succes") {
                  this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
                      this.Restaurant = data;
                  });
              }
          });
      }




  }

  onaddprod()
  {
      document.getElementById("addproddiv")["hidden"] = false;
      document.getElementById("addproddiv").scrollIntoView();

  }










    //notification
  showNotificationwithconfirmation(nbr,from, align, msg) {
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
              '<div  data-notify="container" >'+
              '<button mat-button  type="button"  class="mat-button" data-notify="dismiss" id="ok"> Oui</button>' +
              '<button mat-button type="button" style="margin-top:20px" class="mat-button" data-notify="dismiss" > Non</button>' +
              '</div>'+
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +

              '</div>'
          });

     

     
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
