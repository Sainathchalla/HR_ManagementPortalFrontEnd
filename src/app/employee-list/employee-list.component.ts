import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number) {
    if (id !== undefined) { // Check if id is defined
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
}
