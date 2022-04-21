import {Component, ViewChild} from '@angular/core';
import {Customer, Service} from './datatable5.service';
import {DxDataGridComponent} from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';


@Component({
    selector: 'datatable5',
    templateUrl: './datatable5.component.html',
    styleUrls: ['./datatable5.component.scss'],
    providers: [Service],
})
export class Datatable5Component{
    // @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
    customers: Customer[];

    constructor(service: Service) {
        this.customers = service.getCustomers();
    }
    // exportGrid() {
    //     const doc = new jsPDF();
    //     exportDataGridToPdf({
    //         jsPDFDocument: doc,
    //         component: this.dataGrid.instance
    //     }).then(() => {
    //         doc.save('Customers.pdf');
    //     });
    // }
}
