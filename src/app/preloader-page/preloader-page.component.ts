import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router'

@Component({
  selector: 'app-preloader-page',
  templateUrl: './preloader-page.component.html',
  styleUrls: ['./preloader-page.component.scss']
})
export class PreloaderPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $(window).on('load', function () {
        var $preloader = $('.wrapper');
        var $spinner   = $preloader.find('.loader');
        $spinner.delay(3000).fadeOut('slow');
        $preloader.delay(3000).fadeOut('slow');
      });
    });
    setTimeout(() => {
      this.router.navigate(['/home']);
  }, 4000);
  }

}
