import {Component, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import {exportDataGrid} from 'devextreme/excel_exporter';
import {Workbook} from 'exceljs';
import { Employee, Service } from './app.service';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Service],
})
export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  employees: Employee[];
  constructor(private service: Service) {
      this.employees = service.getEmployees();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  exportPDF() {
      const doc = new jsPDF();
      exportDataGridToPdf({
          jsPDFDocument: doc,
          component: this.dataGrid.instance,
      }).then(() => {
          doc.save('Datatable8.pdf');
      });
  }


  exportExcel() {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Main sheet');
      exportDataGrid({
          component: this.dataGrid.instance,
          worksheet: worksheet
          // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      }).then(function() {
          workbook.xlsx.writeBuffer()
              // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
              .then(function(buffer: BlobPart) {
                  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Datatable8.xlsx');
              });
      });
  }
}