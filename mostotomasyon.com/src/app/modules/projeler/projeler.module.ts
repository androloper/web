import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProjelerComponent } from 'app/modules/projeler/projeler.component';
import {CdkScrollableModule} from "@angular/cdk/scrolling";

const projelerRoutes: Route[] = [
    {
        path     : '',
        component: ProjelerComponent
    }
];

@NgModule({
    declarations: [
        ProjelerComponent
    ],
    imports: [
        RouterModule.forChild(projelerRoutes),
        CdkScrollableModule
    ]
})
export class ProjelerModule
{
}
