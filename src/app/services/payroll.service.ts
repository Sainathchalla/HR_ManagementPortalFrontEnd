import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payroll } from '../models/payroll.model';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private apiUrl = 'http://localhost:8093/payroll'; // Replace with your backend's URL

  constructor(private http: HttpClient) {}

  getPayrollDetails(payrollId: number): Observable<Payroll> {
    return this.http.get<Payroll>(`${this.apiUrl}/${payrollId}`);
  }

  getPayrollId(employeeId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${employeeId}/payrollId`);
  }

  getAllPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(this.apiUrl);
  }

  createPayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(this.apiUrl, payroll);
  }

  updatePayroll(payrollId: number, payroll: Payroll): Observable<Payroll> {
    return this.http.put<Payroll>(`${this.apiUrl}/${payrollId}`, payroll);
  }

  deletePayroll(payrollId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${payrollId}`);
  }

  payrollExistsForEmployee(employeeId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/employee/${employeeId}`);
  }
}
