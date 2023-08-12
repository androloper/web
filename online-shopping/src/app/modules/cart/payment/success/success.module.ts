import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslocoModule} from '@ngneat/transloco';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../../../../shared/shared.module";
import {FuseAlertModule} from "../../../../../@fuse/components/alert";
import {SuccessComponent} from "./success.component";

const successRoutes: Route[] = [
    {
        path     : '',
        component: SuccessComponent
    }
];

@NgModule({
    declarations: [
        SuccessComponent
    ],
    imports: [
        RouterModule.forChild(successRoutes),
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        SharedModule,
        MatCheckboxModule,
        MatFormFieldModule,
        FuseAlertModule,
        MatInputModule
    ]
})
export class SuccessModule
{
}
