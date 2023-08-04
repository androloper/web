import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AccountComponent } from 'app/modules/account/account.component';

const accountRoutes: Route[] = [
    {
        path     : '',
        component: AccountComponent
    }
];

@NgModule({
    declarations: [
        AccountComponent
    ],
    imports     : [
        RouterModule.forChild(accountRoutes)
    ]
})
export class AccountModule
{
}
