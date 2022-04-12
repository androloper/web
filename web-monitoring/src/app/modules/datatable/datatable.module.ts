import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DatatableComponent } from 'app/modules/datatable/datatable.component';
import {MatTableModule} from '@angular/material/table';
import {FuseCardModule} from '../../../@fuse/components/card';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AgGridModule} from 'ag-grid-angular';

const datatableRoutes: Route[] = [
    {
        path     : 'datatable',
        component: DatatableComponent
    }
];

@NgModule({
    declarations: [
        DatatableComponent
    ],
    imports: [
        RouterModule.forChild(datatableRoutes),
        MatTableModule,
        FuseCardModule,
        MatSortModule,
        MatPaginatorModule,
        AgGridModule.withComponents([])
    ]
})
export class DatatableModule
{
}
