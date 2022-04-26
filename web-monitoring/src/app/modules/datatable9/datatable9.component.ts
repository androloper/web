import {Component, OnInit, ViewChild} from '@angular/core';
import {Datatable9Service} from './data/datatable9.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {Datatable9} from './data/datatable9';
import {jsPDF} from 'jspdf';
import {exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import {Workbook} from 'exceljs';
import {exportDataGrid} from 'devextreme/excel_exporter';
import saveAs from 'file-saver';

@Component({
    selector: 'datatable9',
    templateUrl: './datatable9.component.html',
    styleUrls: ['./datatable9.component.scss'],
    providers: [Datatable9Service]
})
export class Datatable9Component implements OnInit {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;
    athletes: Datatable9[];
    constructor(private service: Datatable9Service) {
    }

    ngOnInit(): void {
       this.service.getList('https://raw.githubusercontent.com/androloper/jsons/main/olympic-winners.json')
            .subscribe((data)=>{
                this.athletes=data;
            });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    exportPDF() {
        const doc = new jsPDF();
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: this.dataGrid.instance,
        }).then(() => {
            doc.save('Datatable9.pdf');
        });
    }
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
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Datatable9.xlsx');
                });
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    exportWord() {

    }
}
