import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable5Component } from 'app/modules/datatable5/datatable5.component';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {DxCheckBoxModule, DxDataGridModule} from 'devextreme-angular';

const datatable5Routes: Route[] = [
    {
        path     : 'datatable5',
        component: Datatable5Component
    }
];

@NgModule({
    declarations: [
        Datatable5Component
    ],
    imports: [
        RouterModule.forChild(datatable5Routes),
        CommonModule,
        MatDividerModule,
        DxDataGridModule,
        DxCheckBoxModule,
    ],
})
export class Datatable5Module
{
}
