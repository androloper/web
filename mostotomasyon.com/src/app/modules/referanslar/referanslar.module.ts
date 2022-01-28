import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReferanslarComponent } from 'app/modules/referanslar/referanslar.component';

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
    imports     : [
        RouterModule.forChild(referanslarRoutes)
    ]
})
export class ReferanslarModule
{
}
