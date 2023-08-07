import { Component } from '@angular/core';
import {Admin} from './modules/auth/models/admin';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    static usr: Admin;
    /**
     * Constructor
     */
    constructor()
    {
    }
}
