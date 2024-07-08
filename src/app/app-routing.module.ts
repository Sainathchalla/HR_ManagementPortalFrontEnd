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


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hr-dashboard', component: HrDashboardComponent, canActivate: [AuthGuard] },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard]},
  { path: 'add-employee', component: EmployeeFormComponent },
  { path: 'view-employees', component: EmployeeListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'edit-employee/:id', component: EmployeeFormComponent },
  { path: 'payroll-list', component: PayrollListComponent },
  { path: 'edit-payroll/:id', component: PayrollFormComponent },
  { path: 'add-payroll', component: PayrollFormComponent },
  { path: 'view-payroll', component: PayrollListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
