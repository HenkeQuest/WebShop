import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../shared/home.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  order: string = 'Band';

  ngOnInit() {
  }

}
