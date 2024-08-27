export interface Payroll {
    id?: number;
    employeeId: number;
    salary: number;
    deductions: number;
    bonuses: number;
    taxInformation: string;
  }
  