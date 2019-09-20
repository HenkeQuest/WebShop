import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { CartService } from './cart.service';
import { RecordService } from './record.service';
import { ClothingService } from './clothing.service';
import { FlagService } from './flag.service';
import { Record } from 'src/app/shared/record.model';
import { UserItem } from './user-item.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = {"UserName" : "", "Email" : ""};

  userDetails: User = {"UserName" : "", "Email" : ""};
  userItem: UserItem = new UserItem();
  userItems: Array<UserItem> = [];

  readonly BaseURI = 'http://localhost:62921/api';
  userStatus = "Log in";

  formModel = this.fb.group({
    UserName :['',Validators.required],
    Email :['',Validators.email],
    FullName :[''],
    Passwords : this.fb.group({
      Password :['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword :['',Validators.required]
    },{validator : this.comparePasswords}),
  });

  constructor(
    private fb:FormBuilder, 
    private http:HttpClient,
    private flagService: FlagService, 
    private recordService: RecordService,
    private clothingService: ClothingService) { 
      this.getUserProfile().subscribe((resUser : User )=> {
        this.currentUser = resUser;
        this.userDetails = resUser;

        this.recordService.getRecordByUserName(this.userDetails.UserName).subscribe(res =>{
          res.forEach(item=>{
            this.addUserItem(item);
          })
        })

        this.flagService.getFlagByUserName(this.userDetails.UserName).subscribe((res) =>{
          res.forEach(item=>{
            this.addUserItem(item);
          })
        })

        this.clothingService.getClothingByUserName(this.userDetails.UserName).subscribe((res) =>{
          res.forEach(item=>{
            this.addUserItem(item);
          })
        })
      },
      err =>{
        console.log(err);
    });
  }
  

  

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password').value!=confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({passwordMismatch:true});
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'/ApplicationUser/Register',body)
  }

  login(formData){
    this.userStatus = "Log out";
    console.log("formData: ", formData);
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData)
  }

  getUserProfile(){
    //var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    //return this.http.get(this.BaseURI+'/UserProfile', {headers : tokenHeader});
    return this.http.get(this.BaseURI+'/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  removeItem(item){
    if(confirm('Are you sure to delete this record?')){
      if("Record" == item.Category){
        console.log("Remove item: ", item.ID);
      console.log("Remove item: ", item.Category);
        this.recordService.deleteRecord(item.ID).subscribe(res=>{
          this.recordService.refreshList();
          console.log("record deleted");
        });
        //this.userItems
      }
      else if("Clothing"  == item.Category){
        this.clothingService.deleteClothing(item.ID).subscribe(res=>{
          this.clothingService.refreshList();
          console.log("record deleted");
        });
      }
      else if("Flag"  == item.Category){
        this.flagService.deleteFlag(item.ID).subscribe(res=>{
          this.flagService.refreshList();
          console.log("record deleted");
        });
      }

      let index = this.userItems.findIndex(e => e.Title === item.Title);
      console.log("index: ", index);
      if (index > -1) {

        this.userItems.splice(index,1);
      }
    }

  }

  addUserItem(item){
    this.userItem = new UserItem();
    this.userItem.Title = item.Title;
    this.userItem.ImagePath= item.ImagePath;
    this.userItem.Category= item.Category;
    this.userItem.ID= item.ID;
    this.userItems.push(this.userItem);
  }
}
