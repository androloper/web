import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    backHome(): void {
        this.router.navigate(['/home']);
    }
}
