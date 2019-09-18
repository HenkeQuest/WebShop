import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';
import { RecordListComponent } from '../record-list/record-list.component';
import { RecordService } from 'src/app/shared/record.service';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.css']
})
export class CategoryPanelComponent implements OnInit {

  categories :  Category[];
  active = true;

  @Output('activate')
  activateEvents: EventEmitter<any>

  constructor(private categoryService : CategoryService, private recordService : RecordService) { 
    
    this.recordService.activeRoute.subscribe(res =>{
      console.log("inactive route");
      this.active = res; 
    })
  }

  ngOnInit() {
    this.categoryService.getCategories().then(res =>{
      this.categories =  res as Category[];
    });
  }

  public onDeactivate(event){
    console.log("onDeactivate: ", event);
    
  }

  

}
