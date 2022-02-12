import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AnaSayfaComponent } from 'app/modules/ana-sayfa/ana-sayfa.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoCoreModule} from '../../core/transloco/transloco.module';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: AnaSayfaComponent
    }
];

@NgModule({
    declarations: [
        AnaSayfaComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        CdkScrollableModule,
        MatTooltipModule,
        TranslocoCoreModule
    ]
})
export class AnaSayfaModule
{
}
