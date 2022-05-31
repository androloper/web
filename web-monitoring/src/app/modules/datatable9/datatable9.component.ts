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
    yearChanges: any[];
    sportChanges: any[];
    exhibitor: any[];
    exhibitors: string;
    countriesInOlympics: any[];
    countries: string;
    sportsInOlympics: any[];
    sportsInOlympics2: any[];
    sports: string;
    yearsInOlympics: any[];
    years: string;
    choosingYear;
    choosingSport;
    totalMedal=0;
    avg: string;
    constructor(private service: Datatable9Service) {
    }

    ngOnInit(): void {
       this.service.getList('https://raw.githubusercontent.com/androloper/jsons/main/olympic-winners.json')
            .subscribe((data)=>{
                this.athletes = data;
                this.yearChanges = data;
                this.sportChanges = data;
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                // this.choosingYear !== null ? this.athletes = [...new Set(data.map(item => item.year === this.choosingYear && item.athlete))] : this.athletes = data;
                this.exhibitor = [...new Set(data.map(item => item.athlete))];
                this.exhibitors = this.exhibitor.length.toString();
                this.countriesInOlympics = [...new Set(data.map(item => item.country))];
                this.countries = this.countriesInOlympics.length.toString();
                this.sportsInOlympics = [...new Set(data.map(item => item.sport))];
                this.sportsInOlympics2 = [...new Set(data.map(item => item.sport).sort((a, b) => a.localeCompare(b)))];
                this.sports = this.sportsInOlympics.length.toString();
                this.yearsInOlympics = [...new Set(data.map(item => item.year).sort((a, b) => a-b))];
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    this.totalMedal += data[i].total;
                }
                this.avg = (this.totalMedal/data.length).toFixed(2);
            });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    itemClicked(e) {
        this.choosingYear = e.itemData;
        this.athletes = [...new Set(this.yearChanges.map(item => item.year === this.choosingYear && true ? item : 'why the row is empty, i dont understand'))];
        console.log(this.athletes);
        this.exhibitor = [...new Set(this.athletes.map(item => item.athlete))];
        this.exhibitors = this.exhibitor.length.toString();
        this.countriesInOlympics = [...new Set(this.athletes.map(item => item.country))];
        this.countries = (this.countriesInOlympics.length-1).toString();
        this.sportsInOlympics = [...new Set(this.athletes.map(item => item.sport))];
        this.sports = (this.sportsInOlympics.length-1).toString();
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.athletes.length; i++) {
            this.totalMedal += this.athletes[i].total;
        }
        this.avg = (this.totalMedal/this.athletes.length).toFixed(2);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    itemClickedForSports(e) {
        this.choosingSport = e.itemData;
        this.athletes = [...new Set(this.sportChanges.map(item => item.sport === this.choosingSport && true ? item : 'why the row is empty, i dont understand'))];
        console.log(this.athletes);
        this.exhibitor = [...new Set(this.athletes.map(item => item.athlete))];
        this.exhibitors = this.exhibitor.length.toString();
        this.countriesInOlympics = [...new Set(this.athletes.map(item => item.country))];
        this.countries = (this.countriesInOlympics.length-1).toString();
        this.sportsInOlympics = [...new Set(this.athletes.map(item => item.sport))];
        this.sports = (this.sportsInOlympics.length-1).toString();
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.athletes.length; i++) {
            this.totalMedal += this.athletes[i].total;
        }
        this.avg = (this.totalMedal/this.athletes.length).toFixed(2);
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
        const blob = new Blob([document.getElementById('gridContainer').innerHTML], {
        });
        saveAs(blob, 'Datatable9.docx');
    }
}
//{'athlete':'Ramazan Baybörek','age':25, 'country': 'Turkey', 'year': 2020, 'date':'20-02-2020', 'sport':'Basketball', 'gold':10, 'silver':0, 'bronze': 0, 'total': 10 }
