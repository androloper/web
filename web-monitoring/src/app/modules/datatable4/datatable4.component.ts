import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'datatable4',
  templateUrl: './datatable4.component.html',
  styleUrls: ['./datatable4.component.scss']
})
export class Datatable4Component implements OnInit{
    @ViewChild('myTable') table: any;

    loadingIndicator = true;
    rows: any[] = [];
    expanded: any = {};
    timeout: any;

    columnMode = ColumnMode;

    // constructor() {
    //     this.fetch((data) => {
    //         setTimeout(() => {
    //             this.rows = data;
    //             this.loadingIndicator=false;
    //         }, 1500);
    //     });
    // }
    ngOnInit(): void {
        setTimeout(() =>{
            this.fetch((data) =>{
                this.rows = data;
                this.loadingIndicator=false;
            });
        }, 1500);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 1500);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', 'https://raw.githubusercontent.com/androloper/jsons/main/10k.json');

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    toggleExpandRow(row) {
        setTimeout(() => {
            console.log('Toggled Expand Row!', row);
            this.table.rowDetail.toggleExpandRow(row);
            }, 10);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    onDetailToggle(event) {
        setTimeout(() => {
            console.log('Detail Toggled', event);
            }, 10);
    }
}

