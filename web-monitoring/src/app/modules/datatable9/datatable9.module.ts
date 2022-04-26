import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable9Component } from 'app/modules/datatable9/datatable9.component';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {DxButtonModule, DxDataGridModule} from 'devextreme-angular';

const datatable9Routes: Route[] = [
    {
        path     : 'datatable9',
        component: Datatable9Component
    }
];

@NgModule({
    declarations: [
        Datatable9Component,
    ],
    imports: [
        RouterModule.forChild(datatable9Routes),
        CommonModule,
        DataTablesModule,
        DxDataGridModule,
        DxButtonModule,
    ]
})
export class Datatable9Module
{
}
