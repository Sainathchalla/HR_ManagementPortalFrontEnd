import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { PayrollFormComponent } from './payroll-form/payroll-form.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AssignEmployeesComponent } from './assign-employees/assign-employees.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HrDashboardComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    EmployeeDashboardComponent,
    PayrollListComponent,
    PayrollFormComponent,
    AddProjectComponent,
    ProjectListComponent,
    AssignEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
