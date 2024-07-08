import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrl: './hr-dashboard.component.css'
})
export class HrDashboardComponent implements OnInit {
  constructor(public router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  logout() {
    // this.router.navigate(['/login'], { replaceUrl: true });
    //Added over here
    this.loginService.clearEmployeeId(); // Clear employee ID from session storage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
