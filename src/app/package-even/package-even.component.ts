import { Component, OnInit ,TemplateRef,ViewChild} from '@angular/core';
import { PackageService } from '../service/package.service';
import { NgForOf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-package-even',
  templateUrl: './package-even.component.html',
  styleUrls: ['./package-even.component.css']
})
export class PackageEvenComponent implements OnInit {

  @ViewChild('content') public templateref: TemplateRef<any>;
 
  errorMsg: string = 'Unable to connect to server';
  packageObject: any = [];
  packageType:string;
  constructor(private PackageService: PackageService, private router:Router) {
   
    // this.packageObject = this.PackageService.getPackageList();
    // alert(this.packageObject.title);
    // this.packageObject = this.PackageService.getsavedPackage();
  
    //console.log(this.packageObject[3].img.data.data);
   }
  
   
  ngOnInit() {
    this.PackageService.getPackageList()
    .subscribe(data => {
     console.log(data);
      this.packageObject=data;
      this.packageObject.forEach(onePackage => {
        onePackage.img = this.getImgData(onePackage.img);
      });
    //  this.PackageService.savePackage(data);
      var $preloader = $('.wrapper');
      var $spinner   = $preloader.find('.loader');
      $spinner.delay(3000).fadeOut('slow');
      $preloader.delay(3000).fadeOut('slow');
    }, error => {
      this.errorMsg = error.error.message;
     
    });
  }

  getImgData(img){
    var binary = '';
    var bytes = new Uint8Array( img.data.data );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return 'data:image/jpg;base64,' + window.btoa( binary );
  }

  Packagedetails(title){
    console.log(title);
    this.packageType="/booknow/"+title;
    this.router.navigate([this.packageType]);
  }
}
