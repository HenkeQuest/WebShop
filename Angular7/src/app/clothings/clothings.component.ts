import { Component, OnInit } from '@angular/core';
import { ClothingService } from 'src/app/shared/clothing.service';
import { Clothing } from 'src/app/shared/clothing.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-clothings',
  templateUrl: './clothings.component.html',
  styles: []
})
export class ClothingsComponent implements OnInit {

  list: Clothing[];
  constructor(private clothingService: ClothingService, private cartService: CartService) { }

  ngOnInit() {
    this.clothingService.getClothings().then(res =>{
      this.list = res as Clothing[];
    })
  }

}
