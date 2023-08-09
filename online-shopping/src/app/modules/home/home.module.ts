import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/modules/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {TranslocoModule} from "@ngneat/transloco";
import {FuseCardModule} from "../../../@fuse/components/card";
import {MatButtonModule} from "@angular/material/button";

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
        TranslocoModule,
        FuseCardModule,
        MatButtonModule
    ]
})
export class HomeModule
{
}
