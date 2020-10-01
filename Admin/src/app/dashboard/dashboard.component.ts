import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $: any;

import {BaseUrl} from '../varglobale.service';
// BaseUrl+'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    
    public dates = [];
    public nbrcommandes = 0;
    public nbrclients = 0;
    public nbrresteaurants = 0;
    public nbrbuyrs: number;
    public max = 0;
    public tmp: Set<string> = new Set();
    Restaurant = [];
    Commandes = [];
    nbrcommendecemois = "";
    p: number = 1;


    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {

      this.http.get<any>(BaseUrl+'/getalluser').subscribe(data => {
          this.nbrclients = data.length;
          this.nbrbuyrs = Math.round((this.nbrclients / this.tmp.size));
          console.log("hetha " + BaseUrl);

      });
      this.http.get<any>(BaseUrl +'/getallrestaurants').subscribe(data => {
          this.Restaurant = data;
          this.nbrresteaurants = data.length
      })

     





      this.dates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
     
      this.http.get<any>(BaseUrl +'/getallcommande').subscribe(data => {
          this.Commandes = data;
          this.nbrcommandes = data.length;
          for (var i = 0; i < data.length; i++) {
              const d = new Date(data[i].date);
              this.dates[d.getMonth()] = this.dates[d.getMonth()]+1;
              this.tmp.add(data[i].userid);
              //console.log(data[i].id + " " + d.getMonth() + " " + d);

          }
          const d = new Date();

          this.nbrcommendecemois = this.dates[d.getMonth()];
          this.max = this.dates.reduce((a, b) => Math.max(a, b));
          var datawebsiteViewsChart = {
              labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
              series: [
                  this.dates

              ]
          };
          var optionswebsiteViewsChart = {
              axisX: {
                  showGrid: true,
                  labelOffset: {
                      x: 40,
                      y: 0
                  }
              },
              axisY: {
                  showGrid: true,
                  labelOffset: {
                      x: 0,
                      y: 15
                  }
              },
              low: 0,
              high: this.max+1,
              chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
          };
          var responsiveOptions: any[] = [
              ['screen and (max-width: 640px)', {
                  seriesBarDistance: 0,
                  axisX: {
                      labelInterpolationFnc: function (value) {
                          return value[0];
                      }
                  }
              }]
          ];
          var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

          //start animation for the Emails Subscription Chart
          this.startAnimationForBarChart(websiteViewsChart);
          console.log(this.dates);
         


          ///////////////////////////////////////////////////////////////////////////////////
          const dataDailySalesChart: any = {
              labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
              series: [
                  this.dates
              ]
          };

          const optionsDailySalesChart: any = {
              lineSmooth: Chartist.Interpolation.cardinal({
                  tension: 0
              }),
              low: 0,
              high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
              chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
          }

          var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

          this.startAnimationForLineChart(dailySalesChart);










      });









      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      


  }






















}
