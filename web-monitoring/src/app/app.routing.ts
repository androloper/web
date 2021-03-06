import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'datatable'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'datatable'},

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
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path       : '',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: '', loadChildren: () => import('app/modules/datatable/datatable.module').then(m => m.DatatableModule)},
            {path: '', loadChildren: () => import('app/modules/datatable2/datatable2.module').then(m => m.Datatable2Module)},
            {path: '', loadChildren: () => import('app/modules/datatable3/datatable3.module').then(m => m.Datatable3Module)},
            {path: '', loadChildren: () => import('app/modules/datatable4/datatable4.module').then(m => m.Datatable4Module)},
            {path: '', loadChildren: () => import('app/modules/datatable5/datatable5.module').then(m => m.Datatable5Module)},
            {path: '', loadChildren: () => import('app/modules/datatable6/datatable6.module').then(m => m.Datatable6Module)},
            {path: '', loadChildren: () => import('app/modules/datatable7/datatable7.module').then(m => m.Datatable7Module)},
            {path: '', loadChildren: () => import('app/modules/datatable8/datatable8.module').then(m => m.Datatable8Module)},
            {path: '', loadChildren: () => import('app/modules/datatable9/datatable9.module').then(m => m.Datatable9Module)},
        ]
    },

    // Admin routes
    // {
    //     path       : '',
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     component  : LayoutComponent,
    //     resolve    : {
    //         initialData: InitialDataResolver,
    //     },
    //     children   : [
    //         {path: 'datatable', loadChildren: () => import('app/modules/datatable/datatable.module').then(m => m.DatatableModule)},
    //     ]
    // }
];
