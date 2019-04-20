import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../service/user.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  @ViewChild('content') public templateref: TemplateRef<any>;

  msg: string = '';
  waitForResponse: boolean = false;

  signupForm: FormGroup;

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
    this.signupForm = new FormGroup({
      'signupData' : new FormGroup({
        'firstName' : new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{5,}$/)])
      })
    })

  }

  creteUser() {
    this.waitForResponse = true;
    this.userService.create(this.signupForm.value.signupData)
      .subscribe(
        data => {
          this.waitForResponse = false;
          this.signupForm.reset();

          this.msg = 'User created successfully';
          this.modalService.open(this.templateref, { centered: true });
        }, error => {
          this.waitForResponse = false;
          if(error.status === 0 && error.statusText === 'Unknown Error'){
            this.msg = 'Please check the server connection!!';
          } else{
            this.msg = error.error.message;
          }
          this.modalService.open(this.templateref, { centered: true });
        });
  }

}
