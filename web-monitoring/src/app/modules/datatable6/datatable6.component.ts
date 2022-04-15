import { Component } from '@angular/core';
import {FlightService} from './flight_service';

@Component({
  selector: 'datatable6',
  templateUrl: './datatable6.component.html',
  styleUrls: ['./datatable6.component.scss']
})
export class Datatable6Component{

    public flights: Flight[];

    constructor(private flightService: FlightService) {
        this.getFlightsData();

    }


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getFlightsData() {
        this.flightService.getFlightsData().subscribe((data) => {
            this.flights = data;
        });
    }
}

export interface Flight{
    id: number;
    flightNumber: string;
    origin: string;
    destination: string;
    departDay: string;
    departTime: string;
    arriveDay: string;
    arriveTime: string;
    price: number;
}
