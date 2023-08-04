import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/modules/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {TranslocoModule} from "@ngneat/transloco";

const homeRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(homeRoutes),
        MatIconModule,
        MatExpansionModule,
        TranslocoModule
    ]
})
export class HomeModule
{
}
