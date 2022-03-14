import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProjelerComponent } from 'app/modules/projeler/projeler.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {TranslocoCoreModule} from '../../core/transloco/transloco.module';

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
        CdkScrollableModule,
        TranslocoCoreModule
    ]
})
export class ProjelerModule
{
}
