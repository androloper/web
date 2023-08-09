import {Component, OnInit, ViewChild} from '@angular/core';
import {formatDate} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'personal',
  templateUrl: './personal.component.html',
})
export class PersonalComponent implements OnInit {
    @ViewChild('accountNgForm') accountNgForm: NgForm;

    alert: any;
    accountForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        // private accServ: AccountService,
    ) {
    }

    ngOnInit(): void {
        // setTimeout(() => {
        this.accountForm = new FormGroup({
            // fullname   : new FormControl(this.account.fullname),
            // firstLetters : new FormControl(this.account.firstLetters),
            // studentNo   : new FormControl(this.account.studentNo),
            // university   : new FormControl(this.detailsAccount.universityName),
            // department   : new FormControl(this.detailsAccount.departmentName),
            // email  : new FormControl(this.account.email),
            // phone: new FormControl(this.account.phone),
            // createdDate: new FormControl(formatDate(this.account.createdDate,'dd/MM/yyyy', 'en', 'tr'))
            fullname: new FormControl('Ramazan Baybörek'),
            email: new FormControl('im@ramazanbayborek.com'),
            phone: new FormControl('5060526793'),
            registeredDate: new FormControl(formatDate('2023-08-09 17:51:58.977', 'dd/MM/yyyy', 'en', 'tr'))
        },);
        // }, 500);
    }
}
