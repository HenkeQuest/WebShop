import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Flag } from 'src/app/shared/flag.model';
import { FlagService } from 'src/app/shared/flag.service';

@Component({
  selector: 'app-flag-details',
  templateUrl: './flag-details.component.html',
  styles: []
})
export class FlagDetailsComponent implements OnInit {

  flag : Flag;
  constructor(private route : ActivatedRoute, private flagService: FlagService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.flagService.getFlag(params.id).subscribe((res: Flag) => {
        this.flag = res;
      });
    });
  }

}
