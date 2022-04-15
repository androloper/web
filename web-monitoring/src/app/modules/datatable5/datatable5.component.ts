import {Component} from '@angular/core';
import {Customer, Service} from './datatable5.service';


@Component({
    selector: 'datatable5',
    templateUrl: './datatable5.component.html',
    styleUrls: ['./datatable5.component.scss'],
    providers: [Service],
})
export class Datatable5Component{
    customers: Customer[];

    constructor(service: Service) {
        this.customers = service.getCustomers();
    }
}
