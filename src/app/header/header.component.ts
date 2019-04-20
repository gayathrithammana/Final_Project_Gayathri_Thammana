import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../service/user.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('content') public templateref: TemplateRef<any>;

  userObject: any = {};

  currentUser: string = '';
  constructor(private userService: UserService, private router: Router, private modalService: NgbModal, private modalConfig: NgbModalConfig) {
    //modalConfig.backdrop = 'static';
    //modalConfig.keyboard = false;

    this.userObject = this.userService.getLoggedInUser();
    
    if(this.userObject)
      this.currentUser = this.userObject.firstName + ' ' + this.userObject.lastName;
  }

  ngOnInit() {
    
  }

  logout(){
    this.userService.deleteLoggedInUser();
    
    if(this.router.url == '/home' || this.router.url == ''){
      window.location.reload();
    }
    else{
      this.router.navigate(['/home']);
    }
    
  }

  openSideNav(){
    this.modalService.open(this.templateref, {windowClass: 'sidenav-modal-class'});
  }

  navigateTo(url){
    this.router.navigate(['/' + url]);
  }

  ngOnDestroy(){
    
    if(this.modalService !== null)  
      this.modalService.dismissAll();
   }
}
