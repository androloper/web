import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';


@Component({
    selector: 'datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit{

    columnDefs: ColDef[] = [
        {field: 'Make-Model',
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            valueGetter: (params) => {
                if (params.data)
                {
                    return params.data.make + ' '+ params.data.model;
                }
            },
            sortable: true,
            minWidth: 300
        },
        // {field: 'Make-Model-Price',
        //     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        //     valueGetter: (params) => {
        //         if (params.data)
        //         {
        //             return params.data.make + ' '+ params.data.model+ ' '+ params.data.price;
        //         }
        //     },
        //     sortable: true,
        //     minWidth: 500
        // },
        { field: 'make', sortable: true, minWidth: 200, resizable: true },
        { field: 'model', sortable: true, minWidth: 200, resizable: true},
        { field: 'price', sortable: true, minWidth: 200, resizable: true}
    ];
    rowData = [
        { make: 'Toyota', model: 'M1', price: 350000 },
        { make: 'Ford', model: 'M2', price: 320000 },
        { make: 'Porsche', model: 'M3', price: 720000 },
        { make: 'Toyota', model: 'M4', price: 360000 },
        { make: 'Ford', model: 'M5', price: 380000 },
        { make: 'Porsche', model: 'M6', price: 722000 },
        { make: 'Toyota', model: 'M7', price: 355000 },
        { make: 'Ford', model: 'M8', price: 322000 },
        { make: 'Porsche', model: 'M9', price: 721000 },
        { make: 'Toyota', model: 'M10', price: 356000 },
        { make: 'Ford', model: 'M11', price: 321000 },
        { make: 'Porsche', model: 'M12', price: 727000 }
    ];
    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    public groupDisplayType: any;
    public paginationPageSize: any;
    public pagination: boolean;
    constructor(
        // private _liveAnnouncer: LiveAnnouncer
    ) {}

    ngOnInit(): void {
        this.groupDisplayType = 'multipleColumns';
        this.pagination = true;
        this.paginationPageSize = 10;
    }

    // // eslint-disable-next-line @typescript-eslint/member-ordering
    // @ViewChild(MatSort) sort: MatSort;
    // // eslint-disable-next-line @typescript-eslint/member-ordering
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // ngAfterViewInit() {
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    // }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // announceSortChange(sortState: Sort) {
    //     // This example uses English messages. If your application supports
    //     // multiple language, you would internationalize these strings.
    //     // Furthermore, you can customize the message to add additional
    //     // details about the values being sorted.
    //     if (sortState.direction) {
    //         this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    //     } else {
    //         this._liveAnnouncer.announce('Sorting cleared');
    //     }
    // }
}
// export interface PeriodicElement {
//     name: string;
//     position: number;
//     weight: number;
//     symbol: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//     {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//     {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//     {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//     {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//     {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//     {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//     {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//     {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//     {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//     {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//     {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//     {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//     {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//     {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//     {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//     {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//     {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//     {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//     {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//     {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
