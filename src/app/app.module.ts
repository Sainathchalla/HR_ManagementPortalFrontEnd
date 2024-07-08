import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { PayrollFormComponent } from './payroll-form/payroll-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HrDashboardComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    EmployeeDashboardComponent,
    PayrollListComponent,
    PayrollFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
