import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ValidateService } from 'src/app/services/validation/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    fullname: '',
    username: '',
    email: '',
    password: '',
  };
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    // console.log(this.user.name)
    let registredUser = this.user;

    // validate fields not empty
    if (!this.validateService.validateRegiter(registredUser)) {
      this._flashMessage.show('please fill in all required fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
    }
    //  validate email
    if (!this.validateService.validateEmail(registredUser.email)) {
      this._flashMessage.show('please put a valid email', {
        cssClass: 'alert-danger',
        timeout: 2000,
      });
    }else{
      this.authService.registerUser(registredUser).subscribe((_res) => {
        const response = JSON.parse(JSON.stringify(_res));
        if (response.success) {
          this._flashMessage.show('You are now registred and can login', {
            cssClass: 'alert-success',
            timeout: 3000,
          });
          this.router.navigate(['login']);
        } else {
          this._flashMessage.show('Something Went Wrong', {
            cssClass: 'alert-danger',
            timeout: 3000,
          });
          this.router.navigate(['register']);
        }
      });
    }

    // register user
   
  }

}
