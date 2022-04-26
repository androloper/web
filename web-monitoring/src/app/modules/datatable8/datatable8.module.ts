import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable8Component } from 'app/modules/datatable8/datatable8.component';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {DetailGridComponent} from './detail-grid/detail-grid.component';
import {DxButtonModule, DxDataGridModule, DxSankeyModule} from 'devextreme-angular';

const datatable8Routes: Route[] = [
    {
        path     : 'datatable8',
        component: Datatable8Component
    }
];

@NgModule({
    declarations: [
        Datatable8Component,
        DetailGridComponent
    ],
    imports: [
        RouterModule.forChild(datatable8Routes),
        CommonModule,
        DataTablesModule,
        DxDataGridModule,
        DxSankeyModule,
        DxButtonModule,
    ]
})
export class Datatable8Module
{
}
