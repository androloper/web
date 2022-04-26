import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Datatable9} from './datatable9';

@Injectable({
    providedIn: 'root'
})
export class Datatable9Service {
    constructor(private httpClient: HttpClient) {}

    getList(actionUrl: string): Observable<Datatable9[]>{
        return this.httpClient.get<Datatable9[]>(`${actionUrl}`);
    }
}
