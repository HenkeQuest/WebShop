import { Injectable } from '@angular/core';
import { Record } from './record.model';

interface cart{
  record: Record[]
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList: cart = { "record": [{
    ID : 0,
    Band : "",
    Album : "",
    Year : "",
    Genre : "",
    Image :  null,
    ImagePath : "",
    Title: "",
    Price: "",
    Category: "",
    UserName: ""
  } ]};
  cartListSize: number = 0;
  constructor() {
    console.log("this.cartList.record: ", this.cartList.record[0]);
   }

  addItemToCart(item){
    
    
    this.cartList.record.push(item);
    this.cartListSize++;
    console.log("this.cartListSize: ", this.cartListSize);
    console.log("this.cartList.record: ", this.cartList.record);
    
  }
}
