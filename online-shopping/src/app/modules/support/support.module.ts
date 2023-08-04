import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SupportComponent } from 'app/modules/support/support.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SharedModule} from "../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {FuseAlertModule} from "../../../@fuse/components/alert";
import {TranslocoModule} from "@ngneat/transloco";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";

const supportRoutes: Route[] = [
    {
        path     : '',
        component: SupportComponent
    }
];

@NgModule({
    declarations: [
        SupportComponent
    ],
    imports: [
        RouterModule.forChild(supportRoutes),
        MatButtonModule,
        MatFormFieldModule,
        SharedModule,
        MatInputModule,
        FuseAlertModule,
        TranslocoModule,
        MatIconModule,
        MatExpansionModule
    ]
})
export class SupportModule
{
}
