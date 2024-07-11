import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      (data: any[]) => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching projects', error);
      }
    );
  }

  editProject(id: number) {
    this.router.navigate(['/edit-project', id]);
    console.log('Edit project with ID:', id);
    // Navigate to the edit project form with the selected project ID
    // You need to implement the edit-project component and corresponding routing
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(
      response => {
        console.log('Project deleted successfully', response);
        this.getProjects(); // Refresh the project list
      },
      error => {
        console.error('Error deleting project', error);
      }
    );
  }

  assignEmployees(projectId: number): void {
    this.router.navigate(['/assign-employees', projectId]);
  }
}
