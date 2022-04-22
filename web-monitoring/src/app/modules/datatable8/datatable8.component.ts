import {Component, ViewChild} from '@angular/core';
import {Employee, Service} from './datatable8.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import {exportDataGrid} from 'devextreme/excel_exporter';
import {Workbook} from 'exceljs';
import saveAs from 'file-saver';



@Component({
    selector: 'datatable8',
    templateUrl: './datatable8.component.html',
    styleUrls: ['./datatable8.component.scss'],
    providers: [Service]
})
export class Datatable8Component {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;
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

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // exportExcel() {
    //     const element = document.getElementById('gridContainer');
    //     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    //     ws['!cols'] = [];
    //     Object.keys(element).forEach((cell: any) => {
    //         const colWidth =
    //         cell==='Title' ? 150
    //             : cell==='FirstName' ? 150
    //                 : cell==='LastName' ? 150
    //                     : cell==='Position' ? 150
    //                         : cell==='State' ? 170
    //                             :cell==='BirthDate' ? 130 : 50;
    //         ws['!cols'].push({
    //             wpx: colWidth
    //         });
    //     });
    //     /* generate workbook and add the worksheet */
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Datatable8');
    //     /* save to file */
    //     XLSX.writeFile(wb, 'Datatable8.xlsx', {cellStyles: true});
    // }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
