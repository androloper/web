import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReferanslarComponent } from 'app/modules/referanslar/referanslar.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {TranslocoCoreModule} from '../../core/transloco/transloco.module';

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
        CdkScrollableModule,
        TranslocoCoreModule
    ]
})
export class ReferanslarModule
{
}
