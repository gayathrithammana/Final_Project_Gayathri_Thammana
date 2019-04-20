import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import{AdventureService} from '../service/adventure.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-adventure-list',
  templateUrl: './adventure-list.component.html',
  styleUrls: ['./adventure-list.component.scss']
})
export class AdventureListComponent implements OnInit {
  adventureObject: any = [];
  adventureType :string ='';
  errorMsg: string = 'Unable to connect to server';
  advlink:string;
  constructor(private AdventureService: AdventureService, private router:Router) { }

  ngOnInit() {
    this.adventureType = this.router.url.split('/')[1];
    console.log(this.adventureType);
    this.advlink="/booknow/"+this.adventureType;
    this.AdventureService.getAdvList(this.adventureType)
      .subscribe(data => {
        this.adventureObject = data;
        console.log(this.adventureObject);
      }, error => {
        
      });

    $(this).ready(function(){
      $(this).scrollTop(0);
      });

      if(this.adventureType == "Scuba"){

        $(this).ready(function(){
          $(window).scroll(function() {
            if ($(this).scrollTop() <= 450) {
                $('#wrapper').addClass('colorFive')
                .removeClass('colorSix');
            } else if ($(this).scrollTop() <= 1100) {
                $('#wrapper').addClass('colorSix')
                .removeClass('colorSeven');
            } else if ($(this).scrollTop() <= 1720) {
                $('#wrapper').addClass('colorSeven')
                .removeClass('colorEight');
            }
          });
        });
      }else if(this.adventureType == "BungeeJumping"){
        $(window).scroll(function() {
          if ($(this).scrollTop() <= 450) {
              $('#wrapper').addClass('colorOne')
              .removeClass('colorFive')
              .removeClass('colorTwo');
          } else if ($(this).scrollTop() <= 1100) {
              $('#wrapper').addClass('colorTwo')
              .removeClass('colorSix')
              .removeClass('colorThree');
          } else if ($(this).scrollTop() <= 1720) {
              $('#wrapper').addClass('colorThree')
              .removeClass('colorSeven')
              .removeClass('colorFour');
          } else if ($(this).scrollTop() <=2300) {
              $('#wrapper').addClass('colorFour')
              .removeClass('colorFive');
          } 
      });        
      }else if(this.adventureType == "RiverRafting"){

        $(this).ready(function(){
          $(window).scroll(function() {
            if ($(this).scrollTop() <= 450) {
                $('#wrapper').addClass('colorEight')
                .removeClass('colorNine');
            } else if ($(this).scrollTop() <= 1100) {
                $('#wrapper').addClass('colorNine')
                .removeClass('colorTen');
            } else if ($(this).scrollTop() <= 1720) {
                $('#wrapper').addClass('colorTen')
                .removeClass('colorEleven');
            }
          });
        });
        
      }else{
        
        $(this).ready(function(){
          $(window).scroll(function() {
            if ($(this).scrollTop() <= 450) {
                $('#wrapper').addClass('colorEleven')
                .removeClass('colorTwelve');
            } else if ($(this).scrollTop() <= 1100) {
                $('#wrapper').addClass('colorTwelve')
                .removeClass('colorThirteen');
            } else if ($(this).scrollTop() <= 1720) {
                $('#wrapper').addClass('colorThirteen')
                .removeClass('colorFifteen');
            } 
          });
        });
      }
  }

  

}
