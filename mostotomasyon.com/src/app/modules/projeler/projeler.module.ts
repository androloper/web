import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProjelerComponent } from 'app/modules/projeler/projeler.component';

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
    imports     : [
        RouterModule.forChild(projelerRoutes)
    ]
})
export class ProjelerModule
{
}
