import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
// import {AccountService} from '../../account/services/account_service';
import {AuthService} from '../../../core/auth/auth.service';
// import { Account } from 'app/modules/account/models/account';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    // providers: [AccountService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class ChangePasswordComponent implements OnInit {

    @ViewChild('passwordNgForm') passwordNgForm: NgForm;
    alert: any;
    passwordForm: FormGroup;
    // account: Account;
    showAlert: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        // private accServ: AccountService,
        private authServ: AuthService,
    ) {
    }

    ngOnInit(): void {
        // this.account = this.authServ.account;
        this.passwordForm = this._formBuilder.group({
            currentPassword  : [''],
            newPassword      : [''],
        });
    }

    changePassword(): void {
        // this.showAlert = false;
        // const body = {
        //     id: this.account.id,
        //     fullname: this.account.fullname,
        //     firstLetters: this.account.firstLetters,
        //     studentNo: this.account.studentNo,
        //     universityId: this.account.universityId,
        //     departmentId: this.account.departmentId,
        //     email: this.account.email,
        //     password: this.passwordForm.value.newPassword,
        //     phone: this.account.phone,
        //     createdDate: this.account.createdDate,
        //     updatedDate: this.account.updatedDate
        // };
        // if(this.passwordForm.value.currentPassword===this.account.password){
        //     this.accServ.changePassword(body).subscribe(() =>{
        //         // Re-enable the form
        //         this.passwordForm.enable();
        //
        //         // Reset the form
        //         this.passwordNgForm.resetForm();
        //
        //         this.alert = {
        //             type   : 'success',
        //             message: 'Şifre değiştirme işleminiz başarılı.'
        //         };
        //         this.showAlert = true;
        //
        //         // setTimeout(() => {
        //         //     this.alert = null;
        //         // }, 7000);
        //     });
        // } else {
        //     // Re-enable the form
        //     this.passwordForm.enable();
        //
        //     // Reset the form
        //     this.passwordNgForm.resetForm();
        //
        //     this.alert = {
        //         type   : 'error',
        //         message: 'Eski şifrenizi yanlış girdiniz.'
        //     };
        //     this.showAlert = true;
        //
        //     // setTimeout(() => {
        //     //     this.alert = null;
        //     // }, 4000);
        // }
    }

}
