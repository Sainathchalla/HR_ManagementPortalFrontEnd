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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  showPayroll: boolean = false;
  showDetails: boolean = false;
  showProjects: boolean = false;
  
  assignedProjects: Project[] = []; // Replace any[] with your actual type for projects
  payrollData: Payroll | undefined; // Replace any with your actual payroll data type

  selectedProjectEmployees: Employee[] = [];
  showProjectEmployees: boolean = false;
  selectedProjectId: number | null = null;

  constructor(private employeeService: EmployeeService, private loginService: LoginService, private payrollService: PayrollService, private router: Router, private projectService: ProjectService, private snackBar: MatSnackBar) {}

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
    if (this.employee?.id !== undefined) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe({
        next: () => {
          this.snackBar.open('Details updated successfully', 'Close', {
            duration: 3000,
          });
          // alert('Details updated successfully');
        },
        error: (error) => {
          console.error('Error updating employee details:', error);

          this.snackBar.open('Error updating employee details', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
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

    //
    this.showProjects = false;

    if (this.showPayroll && this.employee?.id !== undefined) {
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
    if (this.showProjects && this.employee?.id !== undefined) {
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

  loadProjectEmployees(projectId: number) {
    if (this.selectedProjectId === projectId) {
      // If the same project is clicked again, toggle the visibility
      this.showProjectEmployees = !this.showProjectEmployees;
      if (!this.showProjectEmployees) {
        // If hiding, clear the selected project id and employee list
        this.selectedProjectId = null;
        this.selectedProjectEmployees = [];
      }
    } else {
      // If a different project is selected, fetch the employees
      this.projectService.getEmployeesDetailsByProjectId(projectId).subscribe({
        next: (data: any[]) => {
          this.selectedProjectEmployees = data;
          this.showProjectEmployees = true;
          this.selectedProjectId = projectId;
        },
        error: (error) => {
          console.error('Error loading project employees:', error);
        }
      });
    }
  }

  logout() {
    this.loginService.clearEmployeeId(); // Clear employee ID from session storage
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
