import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeDashboardService } from '../services/employee-dashboard.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  public employees: Employee[] = [];
  public employee:Employee={
    employeeId:0,
    empName:'',
    address:'',
    salary:0,
    age:0
  };
  public editEmployee : Employee={
    
      employeeId:0,
      empName:'',
      address:'',
      salary:0,
      age:0
  
  };
  public deleteEmployee !: Employee;
  

  updateID: any ;

  constructor(private employeeService : EmployeeDashboardService) { }

  ngOnInit(): void {

   
   

    this.getEmployees();  

    

  }

  public getEmployees():void{
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }  
    );
  }

  public onOpenModal(employee1: Employee, mode: string):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editEmployee = employee1;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee1;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();

  }

  public onAddEmployee(addForm: NgForm): void{
     
    this.employeeService.addEmployee(this.employee)
    .subscribe(response=>{
      this.getEmployees();
      addForm.reset();
         
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }


  //get copy of current employee
  getEmployeeId(employeeId:Employee){
   this.updateID= employeeId;
   this.editEmployee=employeeId;

  }




// edit employee
  public onEditEmployee(): void{
    
    this.employee.employeeId= this.updateID.employeeId;
    this.employeeService.updateEmployee(this.employee).subscribe(response=>{
      this.getEmployees();
      
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  //delete employee
  public onDeleteEmployee(employee: number): void {
    this.employeeService.deleteEmployee(employee).subscribe(response=>{
    this.getEmployees();
    
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  });
}


}




