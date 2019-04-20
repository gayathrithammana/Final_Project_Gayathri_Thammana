import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('content') public templateref: TemplateRef<any>;

  errorMsg: string = '';
  waitForResponse: boolean = false;

  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal, private modalConfig: NgbModalConfig) {
    modalConfig.backdrop = 'static';
    modalConfig.keyboard = false;
    this.createFormGroup();
   }

  ngOnInit() {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/home']);
    } 
 }

  createFormGroup(){
    this.loginForm = new FormGroup({
      'userData' : new FormGroup({
        'email' : new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
      })
      
    })
  }

  checkUserExist() {
    this.waitForResponse = true;
    this.userService.checkUserExist(this.loginForm.value.userData.email, this.loginForm.value.userData.password)
      .subscribe(data => {
        this.waitForResponse = false;
        this.userService.saveLoggedInUser(data);
        this.router.navigate(['/home']);
      }, error => {
        this.waitForResponse = false;
        if(error.status === 0 && error.statusText === 'Unknown Error'){
          this.errorMsg = 'Please check the server connection!!';
        } else{
          this.errorMsg = error.error.message;
        }
        
        this.modalService.open(this.templateref, { centered: true });
      });
  }

}
