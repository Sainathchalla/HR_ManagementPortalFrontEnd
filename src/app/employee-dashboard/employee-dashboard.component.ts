import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';
import { PayrollService } from '../services/payroll.service';
import { Payroll } from '../models/payroll.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    hireDate: '',
    position: ''
  };

  payrollData: Payroll | null = null;
  showPayroll: boolean = false;
  showDetails: boolean = false;

  constructor(private employeeService: EmployeeService, private loginService: LoginService, private payrollService: PayrollService, private router: Router) {}

  ngOnInit(): void {
    const employeeId = this.loginService.getEmployeeId();
    if (employeeId !== null) {
      this.loadEmployeeDetails(employeeId);
    } else {
      console.error('Employee ID is null.');
    }
  }

  loadEmployeeDetails(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        this.employee.id = employeeId;
      },
      error: (error) => {
        console.error('Error loading employee details:', error);
      }
    });
  }

  saveEmployeeDetails() {
    if (this.employee.id !== undefined) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe({
        next: () => {
          alert('Details updated successfully');
        },
        error: (error) => {
          console.error('Error updating employee details:', error);
        }
      });
    } else {
      console.error('Employee ID is undefined.');
    }
  }

  togglePayroll() {
    this.showPayroll = !this.showPayroll;
    this.showDetails = false;

    if (this.showPayroll && this.employee.id !== undefined) {
      this.payrollService.getPayrollId(this.employee.id).subscribe({
        next: (payrollId: number) => {
          this.payrollService.getPayrollDetails(payrollId).subscribe({
            next: (data: Payroll) => {
              this.payrollData = data;
            },
            error: (error) => {
              console.error('Error loading payroll details:', error);
            }
          });
        },
        error: (error: any) => {
          console.error('Error getting payroll ID:', error);
        }
      });
    }
  }

  logout() {
    // Implement your logic to logout
    this.loginService.clearEmployeeId(); // Clear employee ID from session storage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
