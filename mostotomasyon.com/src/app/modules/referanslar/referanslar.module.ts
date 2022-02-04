import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReferanslarComponent } from 'app/modules/referanslar/referanslar.component';
import {CdkScrollableModule} from "@angular/cdk/scrolling";

const referanslarRoutes: Route[] = [
    {
        path     : '',
        component: ReferanslarComponent
    }
];

@NgModule({
    declarations: [
        ReferanslarComponent
    ],
    imports: [
        RouterModule.forChild(referanslarRoutes),
        CdkScrollableModule
    ]
})
export class ReferanslarModule
{
}
