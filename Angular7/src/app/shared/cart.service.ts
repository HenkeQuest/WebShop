import { Injectable } from '@angular/core';
import { Record } from './record.model';

interface cart{
  record: Record[]
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList: cart = { "record": []};
  constructor() { }

  addItemToCart(item){
    
    
    this.cartList.record.push(item);
    console.log("this.cartList.record: ", this.cartList.record);
    
  }
}
