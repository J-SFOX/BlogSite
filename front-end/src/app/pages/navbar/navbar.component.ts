import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private router: Router,
    public authService: AuthService,
    private _flashMessage: FlashMessagesService
  ) {}

  onLogoutClick() {
    this.authService.logout();
    this._flashMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000,
    });
    this.router.navigate(['login'])
    return false;
  }
}
