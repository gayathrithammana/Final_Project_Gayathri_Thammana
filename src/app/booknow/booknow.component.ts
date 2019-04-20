import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { BookService } from '../service/Book.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.scss']
})

export class BooknowComponent implements OnInit{

  @ViewChild('content') public templateref: TemplateRef<any>;


  public displayedColumns = ['price', 'Date', 'AdvType', 'Time', 'addToCart'];
  public dataSource = new MatTableDataSource<BookingTableData>();

  dateEntered : String;
  month:String;
  year:String;
  day:String;
  dateObject : any =[];
  cartData: any;
  userEmail: String;
  adventureType :String;
  msg:String='';
  constructor(private BookService : BookService, private userService: UserService,private router:Router,
    private modalService: NgbModal, private modalConfig: NgbModalConfig){
    
  }
 
  myFunc(){

    $('#tbl').show();
        this.dateEntered = $('#InputDate').val();
        console.log("Date Entered"+ this.dateEntered);
        if(this.dateEntered){
    
         this.month= this.dateEntered.split('/')[0];
         this.day=this.dateEntered.split('/')[1];
        this.year=this.dateEntered.split('/')[2];
        }
         console.log("Month"+ this.month);
         
         this.dateEntered=this.month+"-"+this.day+"-"+this.year;  
         this.adventureType = this.router.url.split('/')[2];
         
         console.log("adventureType"+this.adventureType);
         this.BookService.getBooking(this.dateEntered,this.adventureType)
        .subscribe(data => {
          console.log("Date before booking"+ this.dateEntered);
        this.dateObject = data;
        this.dataSource.data = data as BookingTableData[];
        if(this.dateObject.length==0)
        {
         this.msg="No Bookings Available for this date";
        }
        console.log(this.dateObject);
      }, error => {
      
      });
    
      }
   
  ngOnInit() {
    const userObject = this.userService.getLoggedInUser();
    
    if(userObject)
      this.userEmail = userObject.email;

  }  

  addToCart(booking){
    
    this.cartData = {
      email: this.userEmail,
      packageDetails: {
        title: this.adventureType,
        date: booking.Date,
        time: booking.Time,
        price: booking.price
      }
    }
    this.BookService.addCartItem(this.cartData)
      .subscribe(data => {
        console.log(data);
        this.modalService.open(this.templateref, { centered: true });
      }, error => {
        
    });
  }
   
}

export interface BookingTableData{
  price: string;
  Date: string;
  AdvType: Date;
  Time: string;
  addToCart: string;
}
