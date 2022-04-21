import { Component} from '@angular/core';
import {Employee, Service} from './datatable8.service';

@Component({
  selector: 'datatable8',
  templateUrl: './datatable8.component.html',
  styleUrls: ['./datatable8.component.scss'],
  providers: [Service]
})
export class Datatable8Component {
    employees: Employee[];

    constructor(private service: Service) {
        this.employees = service.getEmployees();
    }

}
