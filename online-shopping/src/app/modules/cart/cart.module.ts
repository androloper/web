import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CartComponent } from 'app/modules/cart/cart.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TranslocoModule} from "@ngneat/transloco";
import {SharedModule} from "../../shared/shared.module";

const cartRoutes: Route[] = [
    {
        path     : '',
        component: CartComponent
    }
];

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        RouterModule.forChild(cartRoutes),
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        SharedModule
    ]
})
export class CartModule
{
}
