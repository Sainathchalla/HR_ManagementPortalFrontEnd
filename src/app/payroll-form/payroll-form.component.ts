import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Payroll } from '../models/payroll.model';
import { PayrollService } from '../services/payroll.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrl: './payroll-form.component.css'
})
export class PayrollFormComponent implements OnInit {
  payroll: Payroll = {
    employeeId: 0,
    salary: 0,
    deductions: 0,
    bonuses: 0,
    taxInformation: ''
  };

  isEditMode = false;

  constructor(private payrollService: PayrollService, private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService,) {}

  ngOnInit(): void {
    const payrollId = this.route.snapshot.paramMap.get('id');
    if (payrollId !== null) {
      this.loadPayrollDetails(Number(payrollId));
    }
  }

  loadPayrollDetails(payrollId: number) {
    this.payrollService.getPayrollDetails(payrollId).subscribe(data => {
      this.payroll = data;
      this.isEditMode = true;
    });
  }

  onSubmit(): void {
    this.employeeService.employeeExists(this.payroll.employeeId).subscribe(employeeExists => {
      if (employeeExists) {
        if (this.isEditMode) {
          this.updatePayroll();
        } else {
          this.createPayroll();
        }
      } else {
        alert('Employee ID does not exist.');
      }
    });
  }

  updatePayroll(): void {
    this.payrollService.updatePayroll(this.payroll.id!, this.payroll).subscribe(() => {
      this.router.navigate(['/view-payroll']).then(() => {
        this.isEditMode = false;
        this.resetForm();
      });
    });
  }

  createPayroll(): void {
    this.payrollService.payrollExistsForEmployee(this.payroll.employeeId).subscribe(payrollExists => {
      if (payrollExists) {
        alert('Payroll already exists for this employee ID.');
      } else {
        this.payrollService.createPayroll(this.payroll).subscribe(() => {
          this.router.navigate(['/view-payroll']).then(() => {
            this.isEditMode = false;
            this.resetForm();
          });
        });
      }
    });
  }

  resetForm(): void {
    this.payroll = {
      employeeId: 0,
      salary: 0,
      deductions: 0,
      bonuses: 0,
      taxInformation: ''
    };
  }

  // onSubmit() {
  //   this.employeeService.employeeExists(this.payroll.employeeId).subscribe(employeeExists => {
  //     if (employeeExists) {
  //       if (this.isEditMode) {
  //         this.payrollService.updatePayroll(this.payroll.id!, this.payroll).subscribe(() => {
  //           this.router.navigate(['/view-payroll']).then(() => {
  //             this.isEditMode = false;
  //             this.resetForm();
  //           });
  //         });
  //       } else {
  //         this.payrollService.payrollExistsForEmployee(this.payroll.employeeId).subscribe(payrollExists => {
  //           if (payrollExists) {
  //             alert('Payroll already exists for this employee ID.');
  //           } else {
  //             this.payrollService.createPayroll(this.payroll).subscribe(() => {
  //               this.router.navigate(['/view-payroll']).then(() => {
  //                 this.isEditMode = false;
  //                 this.resetForm();
  //               });
  //             });
  //           }
  //         });
  //       }
  //     } else {
  //       alert('Employee ID does not exist.');
  //     }
  //   });
  // }

  // resetForm(): void {
  //   this.payroll = {
  //     employeeId: 0,
  //     salary: 0,
  //     deductions: 0,
  //     bonuses: 0,
  //     taxInformation: ''
  //   };
  // }
}
