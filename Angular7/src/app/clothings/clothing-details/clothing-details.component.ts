import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClothingComponent } from 'src/app/admin-panel/clothing/clothing.component';
import { Clothing } from 'src/app/shared/clothing.model';
import { ClothingService } from 'src/app/shared/clothing.service';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-clothing-details',
  templateUrl: './clothing-details.component.html',
  styles: []
})
export class ClothingDetailsComponent implements OnInit {

  clothing: Clothing
  constructor(private route: ActivatedRoute, private clothingService : ClothingService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.clothingService.getClothing(params.id).subscribe((res: Clothing) => {
        this.clothing = res;
      });
    });
  }

}
