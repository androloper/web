import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    {path: '', pathMatch : 'full', redirectTo: 'home'},
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        // resolve    : {
        //     initialData: InitialDataResolver,
        // },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Admin routes
    // {
    //     path       : '',
    //     // canActivate: [AuthGuard],
    //     // canActivateChild: [AuthGuard],
    //     canActivate: [NoAuthGuard],
    //     canActivateChild: [NoAuthGuard],
    //     component  : LayoutComponent,
    //     resolve    : {
    //         initialData: InitialDataResolver,
    //     },
    //     children   : [
    //         {path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)},
    //         {path: 'shop', loadChildren: () => import('app/modules/shop/shop.module').then(m => m.ShopModule)},
    //         {path: 'support', loadChildren: () => import('app/modules/support/support.module').then(m => m.SupportModule)},
    //         // {path: 'account', loadChildren: () => import('app/modules/account/account.module').then(m => m.AccountModule)},
    //         {path: 'cart', loadChildren: () => import('app/modules/cart/cart.module').then(m => m.CartModule)},
    //     ]
    // },
    {
        path: '',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)},
            {path: 'shop', loadChildren: () => import('app/modules/shop/shop.module').then(m => m.ShopModule)},
            {path: 'support', loadChildren: () => import('app/modules/support/support.module').then(m => m.SupportModule)},
            {path: 'cart', loadChildren: () => import('app/modules/cart/cart.module').then(m => m.CartModule)},
            {path: 'cart/payment', loadChildren: () => import('app/modules/cart/payment/payment.module').then(m => m.PaymentModule)},
            {path: 'cart/payment/success', loadChildren: () => import('app/modules/cart/payment/success/success.module').then(m => m.SuccessModule)},
        ]
    },

    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            // {path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)},
            // {path: 'shop', loadChildren: () => import('app/modules/shop/shop.module').then(m => m.ShopModule)},
            // {path: 'support', loadChildren: () => import('app/modules/support/support.module').then(m => m.SupportModule)},
            {path: 'account', loadChildren: () => import('app/modules/account/account.module').then(m => m.AccountModule)},
            // {path: 'cart', loadChildren: () => import('app/modules/cart/cart.module').then(m => m.CartModule)},
            // {path: 'account', loadChildren: () => import('app/modules/account/account.module').then(m => m.AccountModule)},
        ]
    }
];
