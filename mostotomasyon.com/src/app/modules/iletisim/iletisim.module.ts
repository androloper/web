import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IletisimComponent } from 'app/modules/iletisim/iletisim.component';
import {CdkScrollableModule} from "@angular/cdk/scrolling";

const iletisimRoutes: Route[] = [
    {
        path     : '',
        component: IletisimComponent
    }
];

@NgModule({
    declarations: [
        IletisimComponent
    ],
    imports: [
        RouterModule.forChild(iletisimRoutes),
        CdkScrollableModule
    ]
})
export class IletisimModule
{
}
