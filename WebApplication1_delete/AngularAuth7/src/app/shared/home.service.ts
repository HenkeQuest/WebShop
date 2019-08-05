import { Injectable } from '@angular/core';
import { RecordService } from './record.service';
import { Record } from './record.model';
import { ClothingService } from './clothing.service';
import { FlagService } from './flag.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  list;
  constructor(private recordService : RecordService,
    private clothingService: ClothingService,
    private flagService: FlagService) {
    console.log("this.list ", this.list);
    this.populate(0);
  }

  populate(id: number){
    this.recordService.getRecords().subscribe(res => {
      this.list = res;
    })
    
  }

  populateFlags(){
    this.flagService.getFlag().then(res => {
      this.list = res;
    })
  }

  populateRecords(){
    this.recordService.getRecords().subscribe(res => {
      this.list = res;
    })
  }

  populateClothing(){
    this.clothingService.getClothing().then(res => {
      this.list = res;
    })
  }
}
