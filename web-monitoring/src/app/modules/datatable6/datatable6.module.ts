import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable6Component } from 'app/modules/datatable6/datatable6.component';
import {CommonModule} from '@angular/common';
import {TableModule} from "primeng/table";
import {MatSortModule} from "@angular/material/sort";

const datatable6Routes: Route[] = [
    {
        path     : 'datatable6',
        component: Datatable6Component
    }
];

@NgModule({
    declarations: [
        Datatable6Component
    ],
    imports: [
        RouterModule.forChild(datatable6Routes),
        CommonModule,
        TableModule,
        MatSortModule,
    ]
})
export class Datatable6Module
{
}
