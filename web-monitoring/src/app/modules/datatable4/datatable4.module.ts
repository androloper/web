import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable4Component } from 'app/modules/datatable4/datatable4.component';
import {MatTableModule} from '@angular/material/table';
import {FuseCardModule} from '../../../@fuse/components/card';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

const datatable4Routes: Route[] = [
    {
        path     : 'datatable4',
        component: Datatable4Component
    }
];

@NgModule({
    declarations: [
        Datatable4Component
    ],
    imports: [
        RouterModule.forChild(datatable4Routes),
        MatTableModule,
        FuseCardModule,
        MatSortModule,
        MatPaginatorModule,
        NgxDatatableModule,
        CommonModule,
        MatDividerModule,
    ]
})
export class Datatable4Module
{
}
