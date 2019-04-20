import { Component, OnInit } from '@angular/core';
import { AccomodationService } from '../service/accomodation.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.scss']
})
export class AccomodationComponent implements OnInit {

  accomodationSites: any = [];
  sortByValue: String;

  constructor(private accomService: AccomodationService) { 
    this.sortByValue = 'siteRating';
  }

  ngOnInit() {
    this.accomService.getAccomodationSites().subscribe(data => {
      this.accomodationSites = data;
      var $preloader = $('.wrapper');
      var $spinner   = $preloader.find('.loader');
      $spinner.delay(3000).fadeOut('slow');
      $preloader.delay(3000).fadeOut('slow');
    }, error => {

    })
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
