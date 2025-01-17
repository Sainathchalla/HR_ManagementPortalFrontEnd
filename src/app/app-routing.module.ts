import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { LoginComponent } from './login/login.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { PayrollFormComponent } from './payroll-form/payroll-form.component';
import { AuthGuard } from './services/auth.guard';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AssignEmployeesComponent } from './assign-employees/assign-employees.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hr-dashboard', component: HrDashboardComponent, canActivate: [AuthGuard] },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard]},
  { path: 'add-employee', component: EmployeeFormComponent, canActivate: [AuthGuard]},
  { path: 'view-employees', component: EmployeeListComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'edit-employee/:id', component: EmployeeFormComponent, canActivate: [AuthGuard]},
  { path: 'payroll-list', component: PayrollListComponent, canActivate: [AuthGuard] },
  { path: 'edit-payroll/:id', component: PayrollFormComponent, canActivate: [AuthGuard] },
  { path: 'add-payroll', component: PayrollFormComponent, canActivate: [AuthGuard] },
  { path: 'view-payroll', component: PayrollListComponent, canActivate: [AuthGuard] },
  { path: 'add-project', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path: 'edit-project/:id', component: AddProjectComponent, canActivate: [AuthGuard]},
  { path: 'view-projects', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'assign-employees/:projectId', component: AssignEmployeesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
