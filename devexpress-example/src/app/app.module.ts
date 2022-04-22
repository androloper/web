import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {DxDataGridModule, DxSankeyModule,DxButtonModule,} from "devextreme-angular";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DetailGridComponent } from './detail-grid/detail-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailGridComponent
  ],
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxSankeyModule,
        DxButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
 export class AppModule { }

 platformBrowserDynamic().bootstrapModule(AppModule);

