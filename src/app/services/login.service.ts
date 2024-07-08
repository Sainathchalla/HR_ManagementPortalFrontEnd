import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private employeeId: number | null = null;

  // setEmployeeId(id: number) {
  //   this.employeeId = id;
  // }

  setEmployeeId(id: number) {
    sessionStorage.setItem('employeeId', id.toString());
  }

  getEmployeeId(): number | null {
    // return this.employeeId;

    //Added over here
    const employeeId = sessionStorage.getItem('employeeId');
    return employeeId ? parseInt(employeeId, 10) : null;

  }

  clearEmployeeId() {
    sessionStorage.removeItem('employeeId');
  }
}
