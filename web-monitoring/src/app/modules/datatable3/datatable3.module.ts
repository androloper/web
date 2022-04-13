import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable3Component } from 'app/modules/datatable3/datatable3.component';
import {MatTableModule} from '@angular/material/table';
import {FuseCardModule} from '../../../@fuse/components/card';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from "@angular/material/divider";

const datatable3Routes: Route[] = [
    {
        path     : 'datatable3',
        component: Datatable3Component
    }
];

@NgModule({
    declarations: [
        Datatable3Component
    ],
    imports: [
        RouterModule.forChild(datatable3Routes),
        MatTableModule,
        FuseCardModule,
        MatSortModule,
        MatPaginatorModule,
        NgxDatatableModule,
        CommonModule,
        MatDividerModule,
    ]
})
export class Datatable3Module
{
}
