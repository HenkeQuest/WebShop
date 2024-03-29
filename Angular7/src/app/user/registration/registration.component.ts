import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toaster:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) =>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toaster.success('New user created!', 'Registartion successful')
        }else{
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toaster.error("User is already taken", "Register faild");
                //Username is already taken
                break;
            
              default:
                this.toaster.error(element.description, "User is already taken");
                //Registartion faild
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
