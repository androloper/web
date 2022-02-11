import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AnaSayfaComponent } from 'app/modules/ana-sayfa/ana-sayfa.component';
import {CdkScrollableModule} from "@angular/cdk/scrolling";
import {MatTooltipModule} from "@angular/material/tooltip";

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
        MatTooltipModule
    ]
})
export class AnaSayfaModule
{
}
