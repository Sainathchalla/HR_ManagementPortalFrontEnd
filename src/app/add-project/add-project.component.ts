import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
  isEditMode = false;

  projectForm: FormGroup;
  projectId: number | null = null;


  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId = +id;
      this.isEditMode = true;
      this.loadProjectDetails(this.projectId);
    }
  }

  loadProjectDetails(id: number): void {
    this.projectService.getProjectById(id).subscribe(
      (data: any) => {
        this.projectForm.patchValue(data);
      },
      error => {
        console.error('Error loading project details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      if (this.isEditMode) {
        this.updateProject();
      } else {
        this.createProject();
      }
    } else {
      console.error('Form is invalid');
    }
  }

  createProject(): void {
    this.projectService.addProject(this.projectForm.value).subscribe(
      response => {
        console.log('Project added successfully:', response);
        this.snackBar.open('Project added successfully', 'Close', {
          duration: 3000, // Duration in milliseconds
        });
        this.projectForm.reset();
      },
      error => {
        console.error('Error adding project:', error);
        this.snackBar.open('Error adding project', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  
  updateProject(): void {
    if (this.projectId !== null) {
      this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe(
        () => {
          console.log('Project updated successfully');
          this.snackBar.open('Project updated successfully', 'Close', {
            duration: 3000,
          });
        },
        error => {
          console.error('Error updating project:', error);
          this.snackBar.open('Error updating project', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
