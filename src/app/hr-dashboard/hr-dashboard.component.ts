// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { LoginService } from '../services/login.service';

// @Component({
//   selector: 'app-hr-dashboard',
//   templateUrl: './hr-dashboard.component.html',
//   styleUrls: ['./hr-dashboard.component.css']
// })
// export class HrDashboardComponent implements OnInit {
//   sidebarVisible: boolean = true; 

//   constructor(public router: Router, private loginService: LoginService) {}

//   ngOnInit(): void {
//   }

//   toggleSidebar() {
//     this.sidebarVisible = !this.sidebarVisible;
//   }

//   logout() {
//     this.loginService.clearEmployeeId(); 
//     this.router.navigate(['/login']); 
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {
  sidebarVisible: boolean = false; // Initial state of the sidebar

  constructor(public router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.loginService.clearEmployeeId(); // Clear employee ID from session storage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
