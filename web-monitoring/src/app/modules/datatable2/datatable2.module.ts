import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable2Component } from 'app/modules/datatable2/datatable2.component';
import {MatTableModule} from '@angular/material/table';
import {FuseCardModule} from '../../../@fuse/components/card';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

const datatable2Routes: Route[] = [
    {
        path     : 'datatable2',
        component: Datatable2Component
    }
];

@NgModule({
    declarations: [
        Datatable2Component,
    ],
    imports: [
        RouterModule.forChild(datatable2Routes),
        MatTableModule,
        FuseCardModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule
    ],
})
export class Datatable2Module
{
}
