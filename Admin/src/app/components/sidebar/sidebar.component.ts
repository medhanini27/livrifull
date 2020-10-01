import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Commandes', icon:'local_grocery_store', class: '' },
    { path: '/table-list', title: 'Resteaurants',  icon:'restaurant', class: '' },
    { path: '/typography', title: 'Clients',  icon:'person', class: '' },
    { path: '/upgrade', title: 'Banniere sponsorise', icon: 'local_atm', class: '' },
    //{ path: '/icons', title: 'Feedback', icon: 'Feedback', class: '' },
  

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
