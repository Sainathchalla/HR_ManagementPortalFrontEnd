import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''; // Initialize email and password
  password: string = '';


  constructor(private employeeService: EmployeeService, private router: Router, private loginService: LoginService) {}

  login() {
    if (this.email === 'hr@gmail.com' && this.password === '12345') {
      //Single line is added.
      this.loginService.setEmployeeId(0);
      this.router.navigate(['/hr-dashboard']);
    } else {
      this.employeeService.authenticate(this.email, this.password).subscribe(
        response => {
          if (response.id !== undefined) {
            this.loginService.setEmployeeId(response.id);
            this.router.navigate(['/employee-dashboard']);
          } else {
            console.error('Employee ID is undefined.');
          }
        },
        error => {
          alert('Invalid credentials');
        }
      );
    }
  }
}
