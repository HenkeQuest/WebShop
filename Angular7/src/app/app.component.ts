import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'AngularAuth7';
  loginStatus = "Log out";
  constructor(private router:Router, private userService: UserService){}

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
    this.userService.userStatus = "Log in"; 
  }


}


