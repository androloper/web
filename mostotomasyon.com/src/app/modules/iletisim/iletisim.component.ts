import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-iletisim',
  templateUrl: './iletisim.component.html',
  styleUrls: ['./iletisim.component.scss']
})
export class IletisimComponent implements OnInit {

    @ViewChild('supportNgForm') supportNgForm: NgForm;
    alert: any;
    supportForm: FormGroup;
    constructor(private _formBuilder: FormBuilder,
                private http: HttpClient) { }

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
        const headers = new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Access-Control-Allow-Origin': '*',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        });
        const obj = {
            name : this.supportForm.value.name,
            email : this.supportForm.value.email,
            subject : this.supportForm.value.subject,
            message: this.supportForm.value.message,
        };
        const options = {
            headers : headers,
            body: obj
        };
        console.log(options);
        this.http.post('mailto:ramazanbayborek@gmail.com', options).subscribe(data => console.log(data));
        // Send your form here using an http request
        console.log('Your message has been sent!');
        this.alert = {
            type   : 'success',
            message: 'Mesajınız bize ulaşmıştır. En kısa zaman içerisinde tarafımızdan dönüş yapılacaktır.'
        };

        setTimeout(() => {
            this.alert = null;
        }, 7000);

        // Clear the form
        this.clearForm();
    }
}
