import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslocoModule} from '@ngneat/transloco';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '../../../shared/shared.module';
import {PaymentComponent} from './payment.component';
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {MatInputModule} from "@angular/material/input";

const paymentRoutes: Route[] = [
    {
        path     : '',
        component: PaymentComponent
    }
];

@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports: [
        RouterModule.forChild(paymentRoutes),
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        SharedModule,
        MatCheckboxModule,
        MatFormFieldModule,
        FuseAlertModule,
        MatInputModule
    ]
})
export class PaymentModule
{
}
