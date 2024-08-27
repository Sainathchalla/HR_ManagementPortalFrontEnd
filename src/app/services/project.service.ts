import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8094/project'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  addProject(project: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, project);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, project);
  }

  getAssignedEmployees(projectId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/${projectId}/employees`);
  }

  getEmployeesDetailsByProjectId(projectId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/${projectId}/employees/details`);
  }

  assignEmployeesToProject(projectId: number, employeeIds: number[]): Observable<any> {
    console.log(employeeIds);
    const payload = employeeIds;
    return this.http.post<any>(`${this.baseUrl}/${projectId}/assign`, payload);
  }

  getAssignedProjects(employeeId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/${employeeId}/projects/details`);
  }
}
