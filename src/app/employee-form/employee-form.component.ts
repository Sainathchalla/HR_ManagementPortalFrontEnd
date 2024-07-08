import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

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
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {}

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
      this.employeeService.updateEmployee(this.employee.id!, this.employee).subscribe(() => {
        this.router.navigate(['/view-employees']).then(() => {
          this.isEditMode = false;
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
        });
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/view-employees']).then(() => {
          this.isEditMode = false;
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
        });
      });
    }
  }
}
