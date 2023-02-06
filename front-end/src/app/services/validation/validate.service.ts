import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegiter(user:User){
    if(user.fullname.length == 0 || user.email.length == 0 || user.username.length == 0 || user.password.length == 0){
      return false;
    }else{
      return true;
    }
  }


  validateEmail(email:string){
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
    return re.test(email)
  }
}
