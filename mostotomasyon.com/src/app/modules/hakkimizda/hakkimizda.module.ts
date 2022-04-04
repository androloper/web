import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HakkimizdaComponent } from 'app/modules/hakkimizda/hakkimizda.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {TranslocoCoreModule} from '../../core/transloco/transloco.module';

const hakkimizdaRoutes: Route[] = [
    {
        path     : '',
        component: HakkimizdaComponent
    }
];

@NgModule({
    declarations: [
        HakkimizdaComponent
    ],
    imports: [
        RouterModule.forChild(hakkimizdaRoutes),
        CdkScrollableModule,
        TranslocoCoreModule
    ]
})
export class HakkimizdaModule
{
}
