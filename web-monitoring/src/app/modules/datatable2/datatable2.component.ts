import {Component, OnInit} from '@angular/core';
import {INVOICE_DATA} from './invoice_data';

@Component({
    selector: 'datatable2',
    templateUrl: './datatable2.component.html',
    styleUrls: ['./datatable2.component.scss']
})
export class Datatable2Component implements OnInit{
    public data;
    ngOnInit(): void {
        this.data = INVOICE_DATA;
    }
}
