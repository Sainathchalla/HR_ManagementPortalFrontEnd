import { Component, OnInit } from '@angular/core';
import { Payroll } from '../models/payroll.model';
import { Router } from '@angular/router';
import { PayrollService } from '../services/payroll.service';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrl: './payroll-list.component.css'
})
export class PayrollListComponent implements OnInit {
  payrolls: any[] = [];

  constructor(private payrollService: PayrollService,private router: Router) { }

  ngOnInit(): void {
    this.getPayrolls();
  }

  getPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe((data: any[]) => {
      this.payrolls = data;
    });
  }

  editPayroll(payroll: any): void {
    this.router.navigate(['/edit-payroll', payroll.id]);
    // Implement edit functionality
  }

  deletePayroll(id: number): void {
    this.payrollService.deletePayroll(id).subscribe(() => {
      this.getPayrolls(); // Refresh the list after deletion
    });
  }
}
