import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-package',
  templateUrl: './shopping-cart-package.component.html',
  styleUrls: ['./shopping-cart-package.component.scss']
})
export class ShoppingCartPackageComponent implements OnInit {

  date: String;
  price: number;
  packageName: String;
  time: String;

  constructor() { 
    this.date= "14-17-2019";
    this.price = 2000;
    this.packageName = "Charming California"
    this.time= "11:00 am to 1:00 pm"
  }

  ngOnInit() {
  }

}
