import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Datatable2Component } from 'app/modules/datatable2/datatable2.component';
import {MatTableModule} from '@angular/material/table';
import {FuseCardModule} from '../../../@fuse/components/card';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {GridModule, GroupService} from '@syncfusion/ej2-angular-grids';

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
        GridModule
    ],
    providers: [GroupService]
})
export class Datatable2Module
{
}
