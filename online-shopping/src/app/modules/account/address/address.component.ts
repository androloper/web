import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
    selector: 'address',
    templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {
    @ViewChild('addressNgForm') addressNgForm: NgForm;

    alert: any;
    addressForm: FormGroup;
    address: any;

    constructor(
        private _formBuilder: FormBuilder,
        // private accServ: AccountService,
    ) {
        this.address = { 'fullname': 'Ramazan Baybörek', 'address1':'Atatürk St. N.1923 F.29 S.10', 'address2': 'Turkey, Izmir, Bornova', 'phone': '5060526793'};
    }

    ngOnInit(): void {
        // setTimeout(() => {
        this.addressForm = new FormGroup({
            // fullname   : new FormControl(this.account.fullname),
            // firstLetters : new FormControl(this.account.firstLetters),
            // studentNo   : new FormControl(this.account.studentNo),
            // university   : new FormControl(this.detailsAccount.universityName),
            // department   : new FormControl(this.detailsAccount.departmentName),
            // email  : new FormControl(this.account.email),
            // phone: new FormControl(this.account.phone),
            // createdDate: new FormControl(formatDate(this.account.createdDate,'dd/MM/yyyy', 'en', 'tr'))
            fullname: new FormControl(''),
            address1: new FormControl(''),
            address2: new FormControl(''),
            phone: new FormControl(''),
        },);
        // }, 500);
    }
}
