import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AnaSayfaComponent } from 'app/modules/ana-sayfa/ana-sayfa.component';

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
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class AnaSayfaModule
{
}
