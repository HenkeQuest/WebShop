import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { CartService } from '../shared/cart.service';
import { User } from '../shared/user.model';
import { RecordService } from '../shared/record.service';
import { ClothingService } from '../shared/clothing.service';
import { Route, Router } from '@angular/router';
import { CategoryPanelComponent } from '../admin-panel/category-panel/category-panel.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Record } from 'src/app/shared/record.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  userItems: Record[] = [];

  constructor(
    private userService: UserService, 
    private cartService: CartService, 
    private recordService: RecordService,
    private clothingService: ClothingService,
    private dialog : MatDialog, 
    private router: Router) { }

  ngOnInit() {
    console.log("this.cartService.cartList: ", this.cartService.cartList);
    
    
  }

  onCreate(){
    this.recordService.imageUrl = "http://localhost:62921/Images/40/default-image.png";
    this.clothingService.imageUrl = "http://localhost:62921/Images/40/default-image.png";
    this.recordService.initializeFormGroup();
    this.clothingService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.router.navigateByUrl('/record');
    this.router.navigate([{ outlets: { category: "record" }}] );
    this.dialog.open(CategoryPanelComponent, dialogConfig).afterClosed().subscribe(result =>{
      //this.refreshMatTable();
      this.router.navigate([{ outlets: { category: null }}] );
      this.router.navigateByUrl('/profile');
    });
  }

}
