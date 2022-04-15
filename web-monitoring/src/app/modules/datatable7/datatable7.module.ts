import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable7Component } from 'app/modules/datatable7/datatable7.component';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';

const datatable7Routes: Route[] = [
    {
        path     : 'datatable7',
        component: Datatable7Component
    }
];

@NgModule({
    declarations: [
        Datatable7Component
    ],
    imports: [
        RouterModule.forChild(datatable7Routes),
        CommonModule,
        DataTablesModule,
    ]
})
export class Datatable7Module
{
}
