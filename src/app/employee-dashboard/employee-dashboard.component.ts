import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';
import { PayrollService } from '../services/payroll.service';
import { Payroll } from '../models/payroll.model';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

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
  assignedProjects: Project[] = []; // Array to hold assigned projects
  showPayroll: boolean = false;
  showDetails: boolean = false;
  showProjects: boolean = false;

  constructor(private employeeService: EmployeeService, private loginService: LoginService, private payrollService: PayrollService, private router: Router, private projectService: ProjectService,) {}

  ngOnInit(): void {
    const employeeId = this.loginService.getEmployeeId();
    if (employeeId !== null) {
      this.loadEmployeeDetails(employeeId);
      this.loadAssignedProjects(employeeId);
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

  loadAssignedProjects(employeeId: number) {
    this.projectService.getAssignedProjects(employeeId).subscribe({
      next: (data: Project[]) => {
        this.assignedProjects = data;
      },
      error: (error) => {
        console.error('Error loading assigned projects:', error);
      }
    });
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


  viewAssignedProjects() {
    this.showDetails = false;
    this.showPayroll = false;
    this.showProjects = !this.showProjects;
    // Fetch assigned projects if the section is to be shown
    if (this.showProjects && this.employee.id !== undefined) {
      this.projectService.getAssignedProjects(this.employee.id).subscribe({
        next: (data: Project[]) => {
          this.assignedProjects = data;
        },
        error: (error) => {
          console.error('Error loading assigned projects:', error);
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
