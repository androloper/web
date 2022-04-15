import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Flight} from './datatable6.component';

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    private MYFLIGHTS: Flight[] = [];

    constructor(
        private http: HttpClient,
    ) { }

    getFlightsData(): Observable<any[]> {
        return this.http.get<Flight[]>('https://raw.githubusercontent.com/androloper/jsons/main/flights.json');
    }
}
