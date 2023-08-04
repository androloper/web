import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    alert: any;
    supportForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.supportForm = this._formBuilder.group({
            name   : ['', Validators.required],
            email  : ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        });
    }
    clearForm(): void
    {
        // Reset the form
        this.supportNgForm.resetForm();
    }

    /**
     * Send the form
     */
    sendForm(): void
    {
        const obj = {
            name : this.supportForm.value.name,
            email : this.supportForm.value.email,
            subject : this.supportForm.value.subject,
            message: this.supportForm.value.message,
        };
        // send request
        this.alert = {
            type   : 'success',
            message: 'Your message has arrived.'
        };

        setTimeout(() => {
            this.alert = null;
        }, 7000);

        // Clear the form
        this.clearForm();
    }
}
