import {Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from "devextreme-angular";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
    @ViewChild(DxDataGridComponent, {static: false}) dataGrid: DxDataGridComponent;
    serverIp: string;
    showAlert: boolean = false;
    alert: any;
    constructor(private http: HttpClient,
                private _matDialog: MatDialog) {
        this.serverIp = AppComponent.serverIp;
    }


    ngOnInit(): void {

    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // callMethods() {
    //     this.http.get<Wallet>(`https://159.146.65.252/notumburada/api/Wallet/GetUserAccount?userId=${this.account.id}`)
    //         .pipe(
    //             mergeMap((data) => {
    //                 this.wallet = data;
    //                 return this.http.get<Transaction[]>(`https://159.146.65.252/notumburada/api/Wallet/GetUserTransactions?accountId=${this.wallet.id}`);
    //             })
    //         ).subscribe();
    // }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    setBuyModalName(value){
        // const index = this.notes.findIndex(item => item.id === value);
        // const toSetValues = this.notes[index];
        // document.getElementById('buyModalLabel').innerText = toSetValues.title.toUpperCase();
    }

    buyNote(noteId, noteAmount): void {
        // console.log(noteId, noteAmount);
        // this.showAlert = false;
        // this.http.get<Wallet>(`${this.serverIp}/notumburada/api/Wallet/GetUserAccount?userId=${this.account.id}`)
        //     .pipe(
        //         mergeMap((data) => {
        //             this.wallet = data;
        //             if(noteAmount<=this.wallet.amount){
        //                 return this.http.post(
        //                     `${this.serverIp}/notumburada/api/Notes/BuyNote?userId=${this.account.id}&noteId=${noteId}`,
        //                     {'': ''});
        //                 // $('#buyNoteModal').hide();
        //             }
        //             else {
        //                 this.alert = {
        //                     type   : 'error',
        //                     message: 'Satın almak istediğiniz not bakiyenizin üzerinde. Lütfen bakiyenizi güncelledikten sonra tekrar deneyin.'
        //                 };
        //                 setTimeout(()=>{
        //                     this.showAlert=false;
        //                 },5000);
        //                 // Show the alert
        //                 this.showAlert = true;
        //             }
        //             console.log('4');
        //         })
        //     )
        //     .subscribe();
        // this.refreshValues();
    }

    refreshValues(): void {
        // this.account= this.authServ.account;
        // this.noteServ.getNotesList(this.account.universityId).subscribe((data: Note[]) => {
        //     this.notes = data;
        // });
    }
}
