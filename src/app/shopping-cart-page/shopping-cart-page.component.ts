import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { BookService } from '../service/Book.service';
import { UserService } from '../service/user.service';
import { MatTableDataSource } from '@angular/material';
import { decode } from '@angular/router/src/url_tree';


declare let paypal: any;

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit, AfterViewChecked {

  public displayedColumns = ['date', 'title', 'time', 'price', 'delete'];
  public dataSource = new MatTableDataSource<CartTableData>();

  userEmail: String;
  cartItems: any;
  total: number = 1;

  //PayPal Code Starts Here
  addScript: boolean = false;
  paypalLoad: boolean = true;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AdxzNHWznw_ZJU3LB1fZoSDYQSntM_c3abNT5zm0jvFZHsc9kyBf43RBxzbbmRFAgcmmf_6v12q9bSgG'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: {total: this.total, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // where to redirect after successful payment
        alert("Success!");
        // this.deleteFromCart(); // to be checked
        this.deleteAllCart();
      })
    }
  };

  ngAfterViewChecked(): void {
    if(!this.addScript){
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig,'#paypal-checkout-btn'); 
        this.paypalLoad = false;
      }) 
    }
  }
  addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve, reject)=>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'http://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
// PayPal Code Ends here

  constructor(private BookService: BookService, private UserService:UserService) { }

  ngOnInit() {
    const userObject = this.UserService.getLoggedInUser();
    
    if(userObject)
      this.userEmail = userObject.email;
    
    this.getCardItems();
  }

  getCardItems(){
    this.BookService.getCardItems(this.userEmail)
    .subscribe(data => {
      this.cartItems = data;
      this.cartItems.forEach(cart => {
        cart.packageDetails.title = decodeURI(cart.packageDetails.title);
        this.total = this.total + parseInt(cart.packageDetails.price)-1;
        
      });
      console.log(data);
      this.dataSource.data = data as CartTableData[];

      }, error => {
        
    });
  }

  deleteFromCart(id){
    this.BookService.deleteFromCart(id)
    .subscribe(data => {
      console.log(data);
      this.total = 1;
      this.getCardItems();
      }, error => {
        
    });
  }

  deleteAllCart(){
    this.BookService.deleteAllCart()
    .subscribe(data => {
      console.log(data);
      this.total = 1;
      this.getCardItems();
      }, error => {
        
    });
  }
}


export interface CartTableData{
  date: string;
  title: string;
  time: string;
  price: string;
  addToCart: string;
  delete: string;
}
