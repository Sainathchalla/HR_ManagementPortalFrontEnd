import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assign-employees',
  templateUrl: './assign-employees.component.html',
  styleUrl: './assign-employees.component.css'
})
export class AssignEmployeesComponent implements OnInit {
  employees: any[] = [];
  selectedEmployees: number[] = [];
  projectId: number;

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getAssignedEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
      },
      error => {
        console.error('Error fetching employees', error);
      }
    );
  }

  onCheckboxChange(event: any): void {
    const employeeId = +event.target.value;
    if (event.target.checked) {
      this.selectedEmployees.push(employeeId);
    } else {
      const index = this.selectedEmployees.indexOf(employeeId);
      if (index !== -1) {
        this.selectedEmployees.splice(index, 1);
      }
    }
  }

  getAssignedEmployees(): void {
    this.projectService.getAssignedEmployees(this.projectId).subscribe(
      (data: number[]) => {
        this.selectedEmployees = data;
      },
      error => {
        console.error('Error fetching assigned employees', error);
      }
    );
  }

  onSubmit(): void {
    this.projectService.assignEmployeesToProject(this.projectId, this.selectedEmployees).subscribe(
      () => {
        console.log('Employees assigned successfully');
        this.router.navigate(['/view-projects']);
      },
      error => {
        console.error('Error assigning employees', error);
      }
    );
  }

  goBack(){
    this.location.back();
  }
}
