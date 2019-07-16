import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAdmin : boolean = false;

  constructor(private router: Router, private service : UserService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      if(localStorage.getItem('token')!=null){
        let roles = next.data['permittedRoles'] as Array<string>;
        console.log("roles: "  , roles);
        if(roles){
          if(this.service.roleMatch(roles)){
            
            this.isAdmin = true;
            console.log("Hej this.isAdmin: ", this.isAdmin);
            return true;
          } 
          else{
            this.router.navigate(["/forbidden"]);
            
            this.isAdmin = false;
            console.log("Hej this.isAdmin: ", this.isAdmin);
            return false;
          }
        }
        console.log("canActivate");
        return true;
      }
      else{
        this.router.navigate(['/user/login']);
        return false;
      }
  }
}
