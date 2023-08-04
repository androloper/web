import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CartComponent } from 'app/modules/cart/cart.component';

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
    imports     : [
        RouterModule.forChild(cartRoutes)
    ]
})
export class CartModule
{
}
