import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService {

  private apiUrl = 'https://localhost:7108/api/Employee';


  constructor(private http: HttpClient) { }
  
  public getEmployee(){
    return this.http.get<any>(this.apiUrl)
    
  }

  public addEmployee(employee: Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/AddEmployee`,employee);
}

public updateEmployee(employee: Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/EditEmployee`,employee);
}

public deleteEmployee(employeeId: number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/DeleteEmployee/${employeeId}`);
}

}
