import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { PayrollService } from '../services/payroll.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService, private router: Router, private payrollService: PayrollService, private location: Location) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  deleteEmployee(id: number) {
    if (id !== undefined) { 
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  editEmployee(id: number) {
    if (id !== undefined) { // Check if id is defined
      this.router.navigate(['/edit-employee', id]);
      // Navigate to edit employee page or perform edit operation
    }
  }

  filterEmployees() {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.dateOfBirth.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.hireDate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goBack() {
    this.location.back(); // Method to navigate back
  }
}
