import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { RecordService } from '../shared/record.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private homeService: HomeService, private recordService: RecordService, private cartService: CartService) { }

  order: string = 'Band';

  ngOnInit() {
    //this.recordService.refreshList();
    // this.recordService.getRecords().subscribe(res => {
    //   this.recordService.list = res;
    // })
  }

}
