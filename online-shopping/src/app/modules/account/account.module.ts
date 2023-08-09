import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AccountComponent } from 'app/modules/account/account.component';
import {TranslocoModule} from "@ngneat/transloco";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";
import { OrdersComponent } from './orders/orders.component';
import {AddressComponent} from "./address/address.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {PersonalComponent} from "./personal/personal.component";
import {FuseAlertModule} from "../../../@fuse/components/alert";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

const accountRoutes: Route[] = [
    {
        path     : '',
        component: AccountComponent
    }
];

@NgModule({
    declarations: [
        AccountComponent,
        OrdersComponent,
        AddressComponent,
        ChangePasswordComponent,
        PersonalComponent
    ],
    imports: [
        RouterModule.forChild(accountRoutes),
        TranslocoModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        FuseAlertModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class AccountModule
{
}
