import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IletisimComponent } from 'app/modules/iletisim/iletisim.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {FuseAlertModule} from '../../../@fuse/components/alert';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from "@angular/common";

const iletisimRoutes: Route[] = [
    {
        path     : '',
        component: IletisimComponent
    }
];

@NgModule({
    declarations: [
        IletisimComponent
    ],
    imports: [
        RouterModule.forChild(iletisimRoutes),
        CdkScrollableModule,
        FuseAlertModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule
    ]
})
export class IletisimModule
{
}
