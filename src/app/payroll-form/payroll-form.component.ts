import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Payroll } from '../models/payroll.model';
import { PayrollService } from '../services/payroll.service';
import { EmployeeService } from '../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../models/employee.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrl: './payroll-form.component.css'
})
export class PayrollFormComponent implements OnInit {
  payroll: Payroll = {
    employeeId: 0,
    salary: 0,
    deductions: 0,
    bonuses: 0,
    taxInformation: ''
  };

  employees: Employee[] = []; // Add a property to hold the list of employees
  isEditMode = false;

  constructor(private payrollService: PayrollService, private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService, private snackBar: MatSnackBar, private location: Location) {}

  ngOnInit(): void {
    const payrollId = this.route.snapshot.paramMap.get('id');
    if (payrollId !== null) {
      this.loadPayrollDetails(Number(payrollId));
    }
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  loadPayrollDetails(payrollId: number) {
    this.payrollService.getPayrollDetails(payrollId).subscribe(data => {
      this.payroll = data;
      this.isEditMode = true;
    });
  }

  onSubmit(): void {
    this.employeeService.employeeExists(this.payroll.employeeId).subscribe(employeeExists => {
      if (employeeExists) {
        if (this.isEditMode) {
          this.updatePayroll();
        } else {
          this.createPayroll();
        }
      } else {
        this.snackBar.open('Employee ID does not exist.', 'Close', { duration: 3000 });
      }
    });
  }

  updatePayroll(): void {
    this.payrollService.updatePayroll(this.payroll.id!, this.payroll).subscribe(
      () => {
        this.snackBar.open('Payroll updated successfully', 'Close', { duration: 3000 });
        this.isEditMode = true;
      },
      error => {
        console.error('Error updating payroll:', error);
        this.snackBar.open('Error updating payroll', 'Close', { duration: 3000 });
      }
    );
  }

  createPayroll(): void {
    this.payrollService.payrollExistsForEmployee(this.payroll.employeeId).subscribe(payrollExists => {
      if (payrollExists) {
        this.snackBar.open('Payroll already exists for this employee ID.', 'Close', { duration: 3000 });
      } else {
        this.payrollService.createPayroll(this.payroll).subscribe(
          () => {
            this.snackBar.open('Payroll created successfully', 'Close', { duration: 3000 });
            this.resetForm();
          },
          error => {
            console.error('Error creating payroll:', error);
            this.snackBar.open('Error creating payroll', 'Close', { duration: 3000 });
          }
        );
      }
    });
  }

  resetForm(): void {
    this.payroll = {
      employeeId: 0,
      salary: 0,
      deductions: 0,
      bonuses: 0,
      taxInformation: ''
    };
  }

  goBack(){
    return this.location.back();
  }
}
