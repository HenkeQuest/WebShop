import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;

  constructor(private router:Router, private service:UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        console.log("res: ", res);
        this.userDetails = res;
      },
      err =>{
        console.log(err);
      }
    );
  }

  onCreate(){
    
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
  }

}
