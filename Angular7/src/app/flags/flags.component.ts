import { Component, OnInit } from '@angular/core';
import { FlagService } from 'src/app/shared/flag.service';
import { Flag } from 'src/app/shared/flag.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styles: []
})
export class FlagsComponent implements OnInit {

  list: Flag[];

  constructor(private flagService: FlagService, private activeRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    console.log('this.activeRoute: ', this.activeRoute);
    this.flagService.getFlags().then(res =>{
      this.list = res as Flag[];
    })
  }

}
