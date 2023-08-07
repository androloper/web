import {Component, OnInit} from '@angular/core';
import {Admin} from '../auth/models/admin';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    user: Admin;
    constructor() {
        this.user = AppComponent.usr;
    }

    ngOnInit(): void {
    }

}
