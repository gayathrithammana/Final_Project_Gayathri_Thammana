import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      var $video = $('.backvideo');
      $video.show();
    });
    $("mutebtn").on("click", function(){
      var bool = $("#audioback").prop("muted");
        $("#audioback").prop("muted",!bool);
    });
  }

}
