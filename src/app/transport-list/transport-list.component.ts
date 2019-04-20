import { Component, OnInit } from '@angular/core';
import { TransportType } from './transporttype.model';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.scss']
})
export class TransportListComponent implements OnInit {

  transportTypes: TransportType[] = [
    new TransportType('Rental Cars', 'Rental Cars', '/transportSites/rentalCars'),
    new TransportType('Rail Travels', 'Rail Travels', '/transportSites/railTravels'),
    new TransportType('Flights', 'Flights', '/transportSites/flights'),
    new TransportType('Motorcycle Rentals', 'Motorcycle Rentals', '/transportSites/motorcyclerentals'),
    new TransportType('Bus & Coach Transport', 'Bus & Coach Transport', '/transportSites/buses'),
    new TransportType('Ferries & Cruise Ships', 'Ferries & Cruise Ships', '/transportSites/waterTaxies')
  ];

  constructor() { }

  ngOnInit() {
  }

}
