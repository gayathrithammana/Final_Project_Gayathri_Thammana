import { Component, OnInit } from '@angular/core';
import { TransportSiteService } from '../../service/transport.service';
import { Router } from '@angular/router'; 
import * as $ from 'jquery';


@Component({
  selector: 'app-transport-sites',
  templateUrl: './transport-sites.component.html',
  styleUrls: ['./transport-sites.component.scss']
})
export class TransportSitesComponent implements OnInit {

  transportSites: any = [];
  transportName: String;
  sortByValue: String;
  
  constructor(private transportService: TransportSiteService, private router: Router) { 
    this.sortByValue = 'siteRating';
  }

  ngOnInit() {
    
    const transportType = this.router.url.split('/')[2];
    if(transportType === 'rentalCars')
      this.transportName = 'Rental Cars';
    if(transportType === 'railTravels')
      this.transportName = 'Rail Travels';
    if(transportType === 'flights')
      this.transportName = 'Flights';
    if(transportType === 'motorcyclerentals')
      this.transportName = 'Motorcycle Rentals';
    if(transportType === 'buses')
      this.transportName = 'Bus & Coach Transport';
    if(transportType === 'waterTaxies')
      this.transportName = 'Ferries & Cruise Ships';

    this.transportService.getTransportSites(transportType)
      .subscribe(data => {
        this.transportSites = data;
        var $preloader = $('.wrapper');
        var $spinner   = $preloader.find('.loader');
        $spinner.delay(3000).fadeOut('slow');
        $preloader.delay(3000).fadeOut('slow');
      }, error => {
        
      });
  }

  getImgData(img){
    var binary = '';
    var bytes = new Uint8Array( img.data.data );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return 'data:image/png;base64,' + window.btoa( binary );
  }

}
