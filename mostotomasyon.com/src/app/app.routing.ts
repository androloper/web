import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'anasayfa'},
    {
        path       : '',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'anasayfa', loadChildren: () => import('app/modules/ana-sayfa/ana-sayfa.module').then(m => m.AnaSayfaModule)},
            {path: 'projeler', loadChildren: () => import('app/modules/projeler/projeler.module').then(m => m.ProjelerModule)},
            {path: 'referanslar', loadChildren: () => import('app/modules/referanslar/referanslar.module').then(m => m.ReferanslarModule)},
            {path: 'iletisim', loadChildren: () => import('app/modules/iletisim/iletisim.module').then(m => m.IletisimModule)},
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
        ]
    }
];
