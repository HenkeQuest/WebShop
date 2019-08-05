import { Component, OnInit } from '@angular/core';
import { FlagService } from 'src/app/shared/flag.service';
import { Flag } from 'src/app/shared/flag.model';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styles: []
})
export class FlagsComponent implements OnInit {

  list: Flag[];

  constructor(private flagService: FlagService) { }

  ngOnInit() {
    this.flagService.getFlag().then(res =>{
      this.list = res as Flag[];
    })
  }

}
