import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    @ViewChild('cardNgForm') cardNgForm: NgForm;
    @ViewChild('billNgForm') billNgForm: NgForm;
    alert: any;
    alert2: any;
    cardForm: FormGroup;
    billForm: FormGroup;
    isAddressExist: boolean = false;
    constructor(private _formBuilder: FormBuilder,
                private router: Router) { }

    ngOnInit(): void {
        this.cardForm = this._formBuilder.group({
            owner   : ['', Validators.required],
            no  : ['', [Validators.required]],
            month: ['', Validators.required],
            year: ['', Validators.required],
            cvv: ['', Validators.required]
        });
        this.billForm = this._formBuilder.group({
            fullname   : ['', Validators.required],
            address: ['', Validators.required],
            postcode: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            phone: ['', Validators.required]
        });
    }
    clearCardForm(): void
    {
        // Reset the form
        this.cardNgForm.resetForm();
    }

    /**
     * Send the form
     */
    sendCardForm(): void
    {
        const obj = {
            owner : this.cardForm.value.owner,
            no : this.cardForm.value.no,
            date : this.cardForm.value.date,
            cvv: this.cardForm.value.cvv,
        };
        // send request
        this.alert = {
            type   : 'success',
            message: 'Payment was successful.'
        };

        setTimeout(() => {
            this.alert = null;
            this.router.navigate(['/cart/payment/success']);
        }, 3000);

        // Clear the form
        this.clearCardForm();
    }
    clearBillForm(): void
    {
        // Reset the form
        this.billNgForm.resetForm();
    }

    /**
     * Send the form
     */
    sendBillForm(): void
    {
        const obj = {
            fullname : this.billForm.value.fullname,
            address : this.billForm.value.address,
            email : this.billForm.value.email,
            phone : this.billForm.value.phone,
        };
        // send request
        this.alert2 = {
            type   : 'success',
            message: 'Your address has been saved. You can continue to payment.'
        };

        setTimeout(() => {
            this.alert2 = null;
        }, 7000);

        this.isAddressExist = true;

        // Clear the form
        this.clearBillForm();
    }
}
