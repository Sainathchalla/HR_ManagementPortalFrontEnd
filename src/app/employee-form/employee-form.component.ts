import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  employee: Employee = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    hireDate: '',
    position: ''
  };

  isEditMode = false;
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private location: Location) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId !== null) {
      this.loadEmployeeDetails(Number(employeeId));
    }
  }

  loadEmployeeDetails(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(data => {
      this.employee = data;
      this.isEditMode = true; // Set isEditMode to true
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.id!, this.employee).subscribe(
        () => {
          this.snackBar.open('Employee updated successfully', 'Close', {
            duration: 3000,
          });
          this.isEditMode = true;
        },
        error => {
          console.error('Error updating employee:', error);
          this.snackBar.open('Error updating employee', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(
        () => {
          this.snackBar.open('Employee created successfully', 'Close', {
            duration: 3000,
          });
          this.resetEmployeeForm();
        },
        error => {
          console.error('Error creating employee:', error);
          this.snackBar.open('Error creating employee', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  private resetEmployeeForm() {
    this.employee = {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
      hireDate: '',
      position: ''
    };
  }

  goBack(){
    this.location.back();
  }
}
