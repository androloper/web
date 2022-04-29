import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable9Component } from 'app/modules/datatable9/datatable9.component';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {DxButtonModule, DxDataGridModule, DxDropDownButtonModule} from 'devextreme-angular';

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
        DxDropDownButtonModule,
    ]
})
export class Datatable9Module
{
}
