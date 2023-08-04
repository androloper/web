import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ShopComponent } from 'app/modules/shop/shop.component';
import {FuseCardModule} from '../../../@fuse/components/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from "@angular/common";
import {FuseAlertModule} from "../../../@fuse/components/alert";

const shopRoutes: Route[] = [
    {
        path     : '',
        component: ShopComponent
    }
];

@NgModule({
    declarations: [
        ShopComponent
    ],
    imports: [
        RouterModule.forChild(shopRoutes),
        FuseCardModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        FuseAlertModule
    ]
})
export class ShopModule
{
}
