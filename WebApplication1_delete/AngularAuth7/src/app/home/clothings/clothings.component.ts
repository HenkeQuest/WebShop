import { Component, OnInit } from '@angular/core';
import { ClothingService } from 'src/app/shared/clothing.service';
import { Clothing } from 'src/app/shared/clothing.model';

@Component({
  selector: 'app-clothings',
  templateUrl: './clothings.component.html',
  styles: []
})
export class ClothingsComponent implements OnInit {

  list: Clothing[];
  constructor(private clothingService: ClothingService) { }

  ngOnInit() {
    this.clothingService.getClothing().then(res =>{
      this.list = res as Clothing[];
    })
  }

}
